const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');
const User = require('./user');

const News = sequelize.define('News', {
    title: {
        type: DataTypes.STRING,
        allowNull: false, 
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Sequelize.NOW, 
    },
    user_id: {
        type: DataTypes.INTEGER, 
        allowNull: false,
    },
});

News.prototype.formattedDate = function () {
    return this.createdAt.toLocaleString();
};
News.belongsTo(User, { as: 'user', foreignKey: 'user_id', onDelete: 'CASCADE' });

module.exports = News;
