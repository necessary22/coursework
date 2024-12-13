
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db'); // Подключаем Sequelize и базу данных

const User = require('./user');
const News = require('./news');
const SavedNews = require('./savedNews');

// Экспортируем модели для использования в других файлах
module.exports = {
  User,
  News,
  SavedNews,
};
