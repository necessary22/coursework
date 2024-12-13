const newsService = require('../services/newsService');
const News = require('../models/news');
const SavedNews = require('../models/savedNews');

exports.createnews = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('У вас нет прав для добавления новостей.');
    }

    const { title, content } = req.body;
    if (!title || !title.trim()) {
        return res.status(400).send('Заголовок не может быть пустым.');
    }
    if (!content || !content.trim()) {
        return res.status(400).send('Содержание поста не может быть пустым.');
    }

    try {
        await newsService.createnews(title, content, req.user.id);
        return res.redirect('/');
    } catch (err) {
        return res.status(500).send(`Ошибка создания поста: ${err.message}`);
    }
}

exports.deletenews = async (req, res) => {
    try {
        const newsId = req.params.newsId;
        // Удаляем связанные записи из SavedNews
        await SavedNews.destroy({ where: { news_id: newsId } });
        // Удаляем запись из News
        await News.destroy({ where: { id: newsId } });

        return res.redirect('/');
    } catch (err) {
        console.error('Ошибка удаления новости:', err);
        return res.status(500).send(`Ошибка удаления новости: ${err.message}`);
    }
};

exports.getAllnews = async (req, res) => {
    try {
        const news = await newsService.getAllnews();
        return res.render('home', { user: req.user, news });
    } catch (err) {
        return res.status(500).send(`Ошибка загрузки новостей: ${err.message}`);
    }
}

exports.saveToProfile = async (req, res) => {
    const newsId = req.params.newsId;
    const userId = req.user.id;

    try {
        // Проверяем, существует ли уже сохранённая новость
        const alreadySaved = await SavedNews.findOne({ where: { news_id: newsId, user_id: userId } });
        if (alreadySaved) {
            return res.status(400).send('Новость уже сохранена в вашем профиле.');
        }

        // Сохраняем новость
        await SavedNews.create({ news_id: newsId, user_id: userId });

        res.redirect('/user/profile');
    } catch (error) {
        console.error('Ошибка сохранения новости:', error);
        res.status(500).send('Ошибка сохранения новости.');
    }
}

exports.viewNews = async (req, res) => {
    try {
        const newsId = req.params.id;
        const newsItem = await News.findByPk(newsId);

        if (!newsItem) {
            return res.status(404).send('Новость не найдена.');
        }

        res.render('newsDetail', { news: newsItem });
    } catch (error) {
        console.error('Ошибка загрузки новости:', error);
        res.status(500).send('Ошибка загрузки новости.');
    }
};
