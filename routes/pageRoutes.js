const express = require('express')
const router = express.Router()
const pageController = require('../controllers/pageController')
const authMiddleware = require('../middlewares/authMiddleware')

router.get('/', authMiddleware, pageController.renderHomePage)
router.get('/login', pageController.renderLoginPage)
router.get('/register', pageController.renderRegisterPage)

module.exports = router
