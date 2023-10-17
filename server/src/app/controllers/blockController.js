const db = require('../../models');

class BlockController {
    async getBlocksAll(req, res, next) {
        try {
            const response = await db.Block.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'avatar'],
                    },
                ],
                attributes: ['id'],
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get post',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get post' + error,
            });
        }
    }

    async getBlocksLimit(req, res, next) {
        try {
            let { limit, page } = req.query;
            if (!limit) limit = 10;
            const response = await db.Block.findAndCountAll({
                raw: true,
                nest: true,
                offset: (+page - 1) * limit > 0 ? (+page - 1) * limit : 0,
                limit: +limit || 10,
                include: [
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'avatar'],
                    },
                ],
                attributes: ['id'],
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : 'failed to get post',
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get post' + error,
            });
        }
    }

    async filterPostsBySearch(req, res, next) {
        try {
            let { query, page, limit } = req.query;
            if (!limit) limit = 10;
            const response = await db.Post.findAndCountAll({
                raw: true,
                nest: true,
                offset: (+page - 1) * limit > 0 ? (+page - 1) * limit : 0,
                limit: +limit || 10,

                include: [
                    {
                        model: db.User,
                        as: 'user',
                        where: {
                            name: {
                                [Op.like]: `%${query}%`,
                            },
                        },
                        attributes: ['name', 'avatar'],
                    },
                ],
                attributes: ['id'],
            });
            return res.status(200).json({
                err: response ? 0 : 1,
                msg: response ? 'OK' : `Không có kết quả cho ${query}`,
                response,
            });
        } catch (error) {
            return res.status(500).json({
                err: -1,
                msg: 'failed to get block' + error,
            });
        }
    }
}
module.exports = new BlockController();
