const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const newsController = require('../controllers/newsController')
const authMiddleware = require('../middlewares/authMiddleware');


router.get('/profile', authMiddleware, userController.getProfile);
router.post('/news/save/:newsId', newsController.saveToProfile);
router.post('/change-role', authMiddleware, userController.changeUserRole);
router.post('/delete-user', authMiddleware, async (req, res, next) => {
    if (!req.user || req.user.role !== 'admin') {
        return res.status(403).send('Доступ запрещен. Только администратор может удалять пользователей.');
    }
    next();
}, userController.deleteUserById);
module.exports = router
