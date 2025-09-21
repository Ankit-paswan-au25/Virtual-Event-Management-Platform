const asyncErrorHandler = require('../utils/catchAsyncError')
const AppError = require('../utils/appError')
const valid = require('validator')
const bycrpt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')


const jwtToken = (userData) => {
    const token = jwt.sign(userData, process.env.JWT_SECRET, { expiresIn: '1h' })
    return token
}

const jwtSessionToken = (userData) => {
    const refreshToken = jwt.sign({ userId: userData }, process.env.REFRESH_SECRET, { expiresIn: process.env.REFRESH_TOKEN_EXP })
    return refreshToken
}

const register = asyncErrorHandler(async (req, res, next) => {
    const { username, password, confirmPassword, email } = req.body


    //if any field is empty
    if (!username || !password || !confirmPassword || !email) {
        return next(new AppError('Please fill all the fields', 403))
    }

    //if password and confirPassword is not same
    if (password != confirmPassword || confirmPassword.length < 8) {
        return next(new AppError('Password Issue', 403))
    }


    //if email is not valid
    if (!valid.isEmail(email)) {
        return next(new AppError('Email is not valid', 403))
    }


    //genrating salt to 
    const salt = await bycrpt.genSalt(0, 12)



    //hashing password
    const hashedPassword = await bycrpt.hash(password, salt)

    //new user in object
    const newUser = {
        name: username,
        email: email,
        password: hashedPassword
    }

    //creating user in dataBase
    const dbUser = await User.create(newUser)

    if (dbUser) {
        dbUser._id = dbUser._id.toString();
    }

    //creating token
    const token = jwtToken(dbUser._id)

    res.status(201).send({
        status: "Success",
        token
    })


});

const login = asyncErrorHandler(async (req, res, next) => {
    const { email, password } = req.body

    //if not username or Password
    if (!email || !password) {
        next(new AppError('Please fill All the fields', 403));
    }


    const dbUser = await User.findOne({ email: email }).select('+password');

    if (!dbUser) {
        next(new AppError('User not Found', 404));
    }

    const isValidPassword = await bycrpt.compare(password, dbUser.password)

    if (!isValidPassword) {
        next(new AppError('Authentication Failed', 401));
    }

    if (dbUser) {
        dbUser._id = dbUser._id.toString();
    }

    const token = jwtToken({ user: dbUser._id, email: dbUser.email })
    const refreshToken = jwtSessionToken({ user: dbUser._id })

    // Set refresh token in HttpOnly cookie
    res.cookie('refreshToken', {
        refreshToken,
        name: "test"
    }, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'development',
        sameSite: 'lax', // or 'strict'
        // maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
        maxAge: 60 * 60 * 1000// one minute
    });
    res.status(200).send({
        status: "success",
        token
    })


});

const logout = (req, res, next) => {



    console.log(req.cookies)
    req.clearCookie('refreshToken')
    console.log(req.cookies, "yyyyyyyyyyyy")

    // // destroy server session
    req.cookies.destroy(err => {
        //res.clearCookie('test'); // clear session id cookie
        res.clearCookie('refreshToken'); // clear refresh token cookie
        if (err) {
            //   return res.status(500).json({ error: 'Failed to destroy session' });
            return new AppError("Unable to destroy please try again later", 500)
        }
        res.status(200).send({
            status: "success",
        })
    })
}

module.exports = {
    login,
    register,
    logout
}