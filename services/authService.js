const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user')

exports.registerUser = async (username, password, role) => {
    const password_hash = await bcrypt.hash(password, 10)
    return await User.create({ username, password_hash, role })
}

exports.loginUser = async (username, password) => {
    const user = await User.findOne({ where: { username } })
    if (user && await bcrypt.compare(password, user.password_hash)) {
        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET)
        return { token, user }
    }
    throw new Error('Неверные учетные данные')
};
