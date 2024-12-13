const news = require('../models/news');
const User = require('../models/user');

exports.createnews = async (title, content, userId) => {
    if (!title || !content) {
        throw new Error('Заголовок и содержание обязательны.');
    }

    return await news.create({
        title, 
        content, 
        user_id: userId, 
    });
};

exports.getAllnews = async () => {
    return await news.findAll({
        include: [{ model: User, as: 'user', attributes: ['username'] }],
        order: [['createdAt', 'DESC']], 
    });
};


exports.deletenewsById = async (newsId, userId, userRole) => {
    const newsItem = await news.findByPk(newsId);

    if (!newsItem) {
        throw new Error('Пост не найден.');
    }


    if (userRole !== 'admin' && newsItem.user_id !== userId) {
        throw new Error('У вас нет прав на удаление этого поста.');
    }

    return await newsItem.destroy();
};
