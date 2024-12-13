const newsService = require('../services/newsService')
const User = require('../models/user')
const SavedNews = require('../models/savedNews');
exports.renderHomePage = async (req, res) => {
    try {
        const news = await newsService.getAllnews()
        return res.render('home', { user: req.user, news })
    } catch (err) {
        return res.status(500).send(`Ошибка загрузки главной страницы: ${err.message}`)
    }
}

exports.renderLoginPage = (req, res) => {
    return res.render('login')
}

exports.renderRegisterPage = (req, res) => {
    return res.render('register')
}

exports.renderProfilePage = async (req, res) => {
    try {
        const users = req.user.role === 'admin' ? await User.findAll() : null
        return res.render('profile', { user: req.user, users })
    } catch (err) {
        return res.status(500).send(`Ошибка загрузки профиля: ${err.message}`)
    }
}
