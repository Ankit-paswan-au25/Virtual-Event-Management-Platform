const session = require('express-session');
const AppError = require('../utils/appError');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel')

// const sessionGuard = session({
//     name: 'sid',               // cookie name for session id
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         httpOnly: true,
//         secure: process.env.NODE_ENV === 'production', // set true with HTTPS
//         sameSite: 'lax',
//         // maxAge: 1000 * 60 * 60 * 24 // 1 day for session cookie
//         maxAge: 15 * 60 * 24
//     }
// })

const sessionGuard = async (req, res, next) => {
    const cookie = req.cookies.refreshToken

    if (!cookie) {

        return next(new AppError('Please  login again', 403))
    }



    const decodedToken = await promisify(jwt.verify)(cookie.refreshToken, process.env.REFRESH_SECRET)



    const authUser = await User.findById(decodedToken.userId.user)

    if (!authUser) {
        return next(new AppError('Please  login again', 403))
    }

    req.user = authUser
    next()
}

module.exports = sessionGuard