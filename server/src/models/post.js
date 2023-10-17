'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Post.belongsTo(models.Image, { foreignKey: 'imagesId', targetKey: 'id', as: 'images' });
            Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
        }
    }
    Post.init(
        {
            title: DataTypes.STRING,
            star: DataTypes.STRING,
            content: DataTypes.STRING,
            Likes: DataTypes.INTEGER,
            shares: DataTypes.INTEGER,
            hashtags: DataTypes.STRING,
            userCode: DataTypes.STRING,

            userId: DataTypes.STRING,
            overviewId: DataTypes.STRING,
            imagesId: DataTypes.STRING,
            priceNumber: DataTypes.FLOAT,
            areaNumber: DataTypes.FLOAT,
            timestamp: DataTypes.DATE,
        },
        {
            sequelize,
            modelName: 'Post',
        },
    );
    return Post;
};
