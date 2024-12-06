const news = require('../models/news')
const User = require('../models/user')

exports.createnews = async (content, userId) => {
    return await news.create({ content, user_id: userId })
}

exports.getAllnews = async () => {
    return await news.findAll({
        include: [{ model: User, as: 'user', attributes: ['username'] }],
        order: [['createdAt', 'DESC']]
    })
}

exports.deletenewsById = async (newsId, userId, userRole) => {
    const news = await news.findByPk(newsId)
    if (!news) {
        throw new Error('Пост не найден.')
    }

    if (userRole !== 'admin' && news.user_id !== userId) {
        throw new Error('У вас нет прав на удаление этого поста.')
    }

    return await news.destroy()
}
