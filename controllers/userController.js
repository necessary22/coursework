const userService = require('../services/userService')
const News = require('../models').news;

exports.getProfile = async (req, res) => {
    try {
        const users = req.user.role === 'admin' ? await userService.getAllUsers() : null
        return res.render('profile', { user: req.user, users })
    } catch (err) {
        return res.status(500).send(`Ошибка загрузки профиля: ${err.message}`)
    }
}

exports.deleteUser = async (req, res) => {
    try {
        if (req.user.id === parseInt(req.params.userId)) {
            return res.status(400).send('Нельзя удалить самого себя.')
        }
        await userService.deleteUserById(req.params.userId)
        return res.redirect('/user/profile')
    } catch (err) {
        return res.status(500).send(`Ошибка удаления пользователя: ${err.message}`)
    }
}

exports.getProfile = async (req, res) => {
    try {
        // Найдем все новости пользователя
        const userNews = await News.findAll({
            where: { user_id: req.user.id },
            include: [{ model: User, as: 'user' }] // Пример включения информации о пользователе, если необходимо
        });

        // Передаем новости в шаблон
        return res.render('profile', {
            user: req.user,
            news: userNews // Здесь передаем новости пользователя
        });
    } catch (err) {
        return res.status(500).send(`Ошибка загрузки данных профиля: ${err.message}`);
    }
};
