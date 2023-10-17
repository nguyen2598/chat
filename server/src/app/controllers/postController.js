const db = require('../../models');

class PostController {
    async getPostsAll(req, res, next) {
        try {
            const response = await db.Post.findAll({
                raw: true,
                nest: true,
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image'],
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description'],
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

    async getPostsLimit(req, res, next) {
        try {
            let { query, limit, page } = req.query;
            if (!limit) limit = 10;
            console.log('limit', query);
            const response = await db.Post.findAndCountAll({
                where: query,
                raw: true,
                nest: true,
                offset: (+page - 1) * limit > 0 ? (+page - 1) * limit : 0,
                limit: +limit || 10,
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image'],
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description'],
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
                where: {
                    address: {
                        [Op.like]: `%${query}%`,
                    },
                },
                include: [
                    {
                        model: db.Image,
                        as: 'images',
                        attributes: ['image'],
                    },
                    {
                        model: db.Attribute,
                        as: 'attributes',
                        attributes: ['price', 'acreage', 'published', 'hashtag'],
                    },
                    {
                        model: db.User,
                        as: 'user',
                        attributes: ['name', 'phone', 'zalo', 'avatar'],
                    },
                ],
                attributes: ['id', 'title', 'star', 'address', 'description'],
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
}
module.exports = new PostController();
