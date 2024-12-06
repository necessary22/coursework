const express = require('express')
const router = express.Router()
const newsController = require('../controllers/newsController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/create', authMiddleware, newsController.createnews)
router.post('/delete/:newsId', authMiddleware, newsController.deletenews)
router.post('/news/save/:newsId', newsController.saveToProfile);

module.exports = router
