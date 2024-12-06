const authService = require('../services/authService')

exports.registerUser = async (req, res) => {
    const { username, password, role } = req.body
    
    if (!['user', 'admin'].includes(role)) {
        return res.status(400).send('Недопустимая роль.')
    }

    try {
        await authService.registerUser(username, password, role)
        return res.redirect('/login')
    } catch (err) {
        return res.status(500).send(`Ошибка регистрации: ${err.message}`)
    }
}

exports.loginUser = async (req, res) => {
    const { username, password } = req.body

    try {
        const { token, user } = await authService.loginUser(username, password)
        res.cookie('token', token, { httpOnly: true, secure: false })
        return res.redirect('/')
    } catch (err) {
        return res.status(401).json({ error: err.message })
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
