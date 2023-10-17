const db = require('../../models');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { v4 } = require('uuid');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_NAME,
        pass: process.env.GMAIL_PASS,
    },
});

// Gửi email xác nhận
function sendVerificationEmail(email, code) {
    console.log(process.env.GMAIL_NAME, process.env.GMAIL_PASS, email, code);
    const mailOptions = {
        from: process.env.GMAIL_NAME,
        to: email,
        subject: 'Xác nhận tài khoản',
        html: `Mã xác nhận của bạn là: <span style="padding:1px 16px; border:1px solid #ccc;">${code}</span> \nmã sẽ hết hạn trong 5 phút vui lòng nhập sớm`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        } else {
            console.log('thanh cong');
        }
    });
}

// Tạo mã xác nhận ngẫu nhiên
function generateVerificationCode() {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
        code += characters[Math.floor(Math.random() * characters.length)];
    }
    return {
        code,
        expiration: Date.now() + 5 * 60 * 1000, // Thời gian hết hạn là 5 phút
    };
}
let dataSend;
class AuthController {
    async sendMail(req, res, next) {
        const { email } = req.body;
        const user = await db.User.findOne({
            where: { email: email },
            raw: true,
        });
        if (user) {
            res.json({
                err: 0,
                msg: 'Mail này đã được sử dụng vui lòng dùng mail khác',
            });
        } else {
            dataSend = generateVerificationCode();
            // req.verificationData = dataSend;
            sendVerificationEmail(email, dataSend.code);
            res.json({
                err: 0,
                msg: 'Vui lòng vào mail lấy mã',
            });
        }
    }
    async forgotPass(req, res, next) {
        const { newPass, password, email } = req.body;
        try {
            const user = await db.User.findOne({
                where: { email: email },
                raw: true,
            });
        } catch (error) {
            res.status(550).json({ err: -1, msg: 'Lỗi server forgot' });
        }
    }

    async register(req, res, next) {
        const { name, password, email, code } = req.body;
        console.log('send', dataSend, dataSend.expiration, code, Date.now());
        try {
            if (code === dataSend?.code) {
                if (Date.now() <= dataSend?.expiration) {
                    // Thời gian hợp lệ, tiếp tục xử lý đăng ký
                    const response = await db.User.create({
                        email,
                        name,
                        password: await argon2.hash(password),
                        // id: v4(),
                    });
                    console.log(response);
                    const token =
                        response &&
                        jwt.sign({ id: response.id, email: response.email }, process.env.SECRET_KEY, {
                            expiresIn: '2d',
                        });
                    res.json({
                        err: 0,
                        msg: 'Tạo tài khoản thành công',
                        token: token,
                        // test: response,
                    });
                } else {
                    res.json({
                        err: 3,
                        msg: 'Mã xác nhận đã hết hạn',
                        token: null,
                    });
                }
            } else {
                res.json({
                    err: 4,
                    msg: 'Mã xác nhận không đúng',
                    token: null,
                });
            }
        } catch (error) {
            res.status(550).json({ err: -1, msg: 'Lỗi server regis' });
        }
    }

    async login(req, res, next) {
        console.log(v4());
        const { password, email } = req.body;
        try {
            console.log(11);
            const user = await db.User.findOne({
                where: { email: email },
                raw: true,
            });
            console.log(22);
            if (!user) {
                res.status(404).json({ err: -1, msg: 'Tài khoản không tồn tại', token: null });
            } else {
                // Kiểm tra xem đúng mật khẩu không
                const passwordValid = await argon2.verify(user.password, password);
                const token =
                    passwordValid &&
                    jwt.sign({ id: user.id, email: user.email }, process.env.SECRET_KEY, {
                        expiresIn: '2d',
                    });
                console.log(33);
                if (token) {
                    res.json({
                        err: 0,
                        msg: 'Đăng nhập tài khoản thành công',
                        token: token,
                    });
                } else {
                    res.json({
                        err: 2,
                        msg: 'Sai mật khẩu',
                        token: null,
                    });
                }
            }
        } catch (error) {
            res.status(550).json({ err: -1, msg: 'Lỗi server regis' });
        }
    }
}
module.exports = new AuthController();
