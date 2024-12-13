const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');
const News = require('./news');

const SavedNews = sequelize.define('SavedNews', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    news_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: true,
});


SavedNews.belongsTo(News, { foreignKey: 'news_id', as: 'news' });
SavedNews.belongsTo(News, { foreignKey: 'news_id', onDelete: 'CASCADE' });
module.exports = SavedNews;
