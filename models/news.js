const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const news = sequelize.define('news', {
    content: DataTypes.STRING,
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW,
    },
    user_id: DataTypes.INTEGER, // Этот ключ связан с пользователем
});

// Метод для форматирования даты
news.prototype.formattedDate = function () {
    return this.createdAt.toLocaleString();
};

// Связь с моделью User
news.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = news;
