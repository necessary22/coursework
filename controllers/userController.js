const userService = require('../services/userService')
const { News } = require('../models');
const User = require('../models/user');
const SavedNews = require('../models/savedNews');

exports.getProfile = async (req, res) => {
    try {
        if (!req.user) {
            throw new Error('Вы не авторизованы.');
        }

        const savedNews = await SavedNews.findAll({
            where: { user_id: req.user.id },
            include: [
                {
                    model: News,
                    as: 'news',
                    include: [{ model: User, as: 'user', attributes: ['username'] }],
                },
            ],
        });

        res.render('profile', {
            user: req.user,
            savedNews,
            error: null, // Без ошибок
        });
    } catch (error) {
        console.error('Ошибка загрузки профиля:', error);
        res.render('profile', {
            user: req.user || null,
            savedNews: [],
            error: error.message, // Передаём текст ошибки
        });
    }
};

exports.deleteUserById = async (req, res) => {
    try {
        const { userId } = req.body;
        const userToDelete = await User.findByPk(userId);

        if (!userToDelete) {
            throw new Error('Пользователь не найден.');
        }

        if (userToDelete.role === 'admin') {
            throw new Error('Нельзя удалить другого администратора.');
        }

        await userToDelete.destroy();
        res.redirect('/user/profile');
    } catch (error) {
        console.error('Ошибка удаления пользователя:', error);
        res.render('profile', {
            user: req.user,
            savedNews: [],
            error: error.message,
        });
    }
};


exports.changeUserRole = async (req, res) => {
    try {
        const { userId, newRole } = req.body;

        if (req.user.role !== 'admin') {
            throw new Error('У вас нет прав для изменения ролей.');
        }

        const user = await User.findByPk(userId);
        if (!user) {
            throw new Error('Пользователь не найден.');
        }

        user.role = newRole;
        await user.save();

        res.redirect('/user/profile');
    } catch (error) {
        console.error('Ошибка изменения роли:', error);
        res.render('profile', {
            user: req.user,
            savedNews: [],
            error: error.message,
        });
    }
};

console.log('User model:', User);
