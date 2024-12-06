const newsService = require('../services/newsService')

exports.createnews = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('У вас нет прав для добавления новостей.')
    }

    const { content } = req.body
    if (!content.trim()) {
        return res.status(400).send('Пост не может быть пустым.')
    }

    try {
        await newsService.createnews(content, req.user.id)
        return res.redirect('/')
    } catch (err) {
        return res.status(500).send(`Ошибка создания поста: ${err.message}`)
    }
}

exports.deletenews = async (req, res) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('У вас нет прав для удаления новостей.')
    }

    try {
        await newsService.deletenewsById(req.params.newsId, req.user.id, req.user.role)
        return res.redirect('/')
    } catch (err) {
        return res.status(500).send(`Ошибка удаления поста: ${err.message}`)
    }
}

exports.getAllnews = async (req, res) => {
    try {
        const news = await newsService.getAllnews()
        return res.render('home', { user: req.user, news })
    } catch (err) {
        return res.status(500).send(`Ошибка загрузки новостей: ${err.message}`)
    }
}

exports.saveToProfile = async (req, res) => {
    const newsId = req.params.newsId;
    const userId = req.user.id;

    try {
        // Проверим, существует ли новость
        const newsItem = await News.findOne({ where: { id: newsId } });

        if (!newsItem) {
            return res.status(404).send('Новость не найдена');
        }

        // Создаем связь с пользователем
        await newsItem.update({ user_id: userId });

        return res.redirect('/profile'); // Перенаправляем на профиль
    } catch (err) {
        return res.status(500).send(`Ошибка сохранения новости: ${err.message}`);
    }
};