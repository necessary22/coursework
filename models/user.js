const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Имя пользователя не может быть пустым',
            },
        },
    },
    password_hash: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: 'Пароль не может быть пустым',
            },
        },
    },
    role: {
        type: DataTypes.ENUM('user', 'admin'), // Возможные роли
        allowNull: false,
        defaultValue: 'admin', // По умолчанию роль "user"
    },
}, {
    timestamps: true,
    hooks: {
        beforeCreate: async (user) => {
            if (!user.password_hash) {
                throw new Error('Пароль не может быть пустым');
            }
        },
    },
});

// Метод проверки роли пользователя
User.prototype.isAdmin = function () {
    return this.role === 'admin';
};

module.exports = User;
