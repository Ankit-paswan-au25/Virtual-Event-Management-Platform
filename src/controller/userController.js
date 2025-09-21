const User = require('../models/userModel')
const AppError = require('../utils/appError')
const asyncErrorHandler = require('../utils/catchAsyncError')
const bycrpt = require('bcryptjs')

const getAllUser = asyncErrorHandler(async (req, res, next) => {
    const users = await User.find()
    res.status(200).send({
        status: "success",
        data: users,
        length: users.length
    })
})

const getSingleUser = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id
    const singleUser = await User.findById(userId)
    res.status(200).send({
        status: "success",
        data: singleUser,
    })
})

const updateUser = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id
    const { username, password, confirmPassword, email } = req.body

    if (!username && !password) {
        return next(new AppError('Please edit atleast one more field to update', 400))
    }

    // if someone Else is trying to update other profile except SuperAdmin they will get error
    const loggedInUserId = req.user._id.toString();
    if (userId !== loggedInUserId && req.user.roleId != 1) {
        return next(new AppError('you are not authorized to perform this action', 403))
    }

    let updateUser = {}

    if (email) {
        return next(new AppError('email cannot be changed', 400))
    }

    if (username) {
        updateUser.name = username
    }

    if (password && confirmPassword == password && password.length > 7) {
        const salt = await bycrpt.genSalt(0, 12)
        const hashedPassword = await bycrpt.hashSync(password, salt)
        updateUser.password = hashedPassword

    }

    const userInUpdate = await User.findByIdAndUpdate(userId, updateUser)
    const updatedUser = await User.findById(userId)

    res.status(200).send({
        status: "success",
        data: {
            from: userInUpdate,
            to: updatedUser
        }
    })
})

const deleteUser = asyncErrorHandler(async (req, res, next) => {
    const userId = req.params.id
    const userDelete = await User.findByIdAndDelete(userId)
    res.status(200).send({
        status: "success",
        data: "user Deleteds"
    })
})

module.exports = {
    getSingleUser,
    getAllUser,
    updateUser,
    deleteUser
}