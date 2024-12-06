const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')
const authMiddleware = require('../middlewares/authMiddleware')
const newsController = require('../controllers/newsController'); 

router.get('/profile', authMiddleware, userController.getProfile)
router.post('/delete/:userId', authMiddleware, userController.deleteUser)
router.post('/news/save/:newsId', newsController.saveToProfile);

module.exports = router
