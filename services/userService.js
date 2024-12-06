const User = require('../models/user')

exports.getAllUsers = async () => {
    return await User.findAll()
}

exports.deleteUserById = async (userId) => {
    return await User.destroy({ where: { id: userId } })
}
