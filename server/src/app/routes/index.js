const authRouter = require('./auth');
const blockRouter = require('./block');
const commentRouter = require('./comment');
const followRouter = require('./follow');
const mediaRouter = require('./media');
const messageRouter = require('./message');
const postRouter = require('./post');

function route(app) {
    app.use('/api/auth', authRouter);
    app.use('/api/block', blockRouter);
    app.use('/api/comment', commentRouter);
    app.use('/api/follow', followRouter);
    app.use('/api/media', mediaRouter);
    app.use('/api/message', messageRouter);
    app.use('/api/post', postRouter);
    // app.use('/', (req, res, next) => {
    //     res.send('server này có chạy nhá-3');
    // });
}

module.exports = route;
