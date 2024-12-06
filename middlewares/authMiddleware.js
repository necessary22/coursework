const jwt = require('jsonwebtoken')
const User = require('../models/user')

module.exports = async (req, res, next) => {
    const token = req.cookies?.token

    if (!token) {
        req.user = null
        return next()
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        const user = await User.findByPk(decoded.id)

        if (!user) {
            req.user = null
            res.clearCookie('token')
            return next()
        }

        req.user = { id: user.id, username: user.username, role: user.role }
        return next()
    } catch (err) {
        req.user = null
        res.clearCookie('token')
        return next()
    }
}
