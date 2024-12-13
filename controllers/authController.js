const authService = require('../services/authService')
const bcrypt = require('bcrypt'); 
const User = require('../models/user'); 


exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body
    
    try {
        const { username, password } = req.body;
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(400).render('register', { error: 'Данный пользователь уже существует' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            username,
            password_hash: hashedPassword,
            role: 'user', // Роль по умолчанию
        });

        res.redirect('/login');
    } catch (err) {
        console.error('Ошибка регистрации:', err);
        res.status(500).render('register', { error: 'Ошибка регистрации. Пожалуйста, попробуйте позже.' });
    }

}



exports.logoutUser = (req, res) => {
    try {
        res.clearCookie('token')
        return res.redirect('/login')
    } catch (err) {
        return res.status(500).send(`Ошибка выхода: ${err.message}`)
    }
}


exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.status(400).render('login', { error: 'Логин и пароль обязательны' });
        }

        const user = await User.findOne({ where: { username } });
        if (!user || !(await bcrypt.compare(password, user.password_hash))) {
            return res.status(401).render('login', { error: 'Неверные учетные данные' });
        }

        const { token} = await authService.loginUser(username, password)
        res.cookie('token', token, { httpOnly: true, secure: false })
        return res.redirect('/')
    } catch (err) {
        console.error(err);
        return res.status(500).render('login', { error: 'Произошла ошибка сервера' });
    }
};



