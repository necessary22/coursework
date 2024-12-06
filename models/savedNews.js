// models/SavedNews.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключаем sequelize из файла db.js

// Здесь можно определить вашу модель
const SavedNews = sequelize.define('SavedNews', {
  // Пример полей
  newsId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  // Другие поля, которые вам нужны
});

// Экспортируем модель
module.exports = SavedNews;
