require('dotenv').config()
const bcrypt = require('bcrypt'); 
const express = require('express')
const path = require('path')
const sequelize = require('./db')
const authRoutes = require('./routes/authRoutes')
const newsRoutes = require('./routes/newsRoutes')
const pageRoutes = require('./routes/pageRoutes')
const userRoutes = require('./routes/userRoutes')


const loggingMiddleware = require('./middlewares/loggingMiddleware')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
app.use(cookieParser())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(loggingMiddleware)

app.use('/', pageRoutes)
app.use('/auth', authRoutes)
app.use('/news', newsRoutes)
app.use('/user', userRoutes)


// Обработчик 404 - Страница не найдена
app.use((req, res, next) => {
    res.status(404).render('404', { url: req.originalUrl });
});

// Обработчик ошибок сервера
app.use((err, req, res, next) => {
    console.error(err.stack); // Лог ошибок на сервере
    res.status(500).render('500', { error: err.message });
});

sequelize.sync({}) 
    .then(() => app.listen(3000, () => console.log('Сервер запущен на http://localhost:3000')))
    .catch(err => console.error('Ошибка синхронизации базы данных:', err));
