const jwt = require('jsonwebtoken');
const { promisify } = require('util');
const User = require('../models/userModel')

const routeGuard = async (req, res, next) => {
    try {

        //if superAdmin
        if (req.user.roleId == 1) {
            return next()
        }
        console.log(req)
        //next()
    } catch (error) {

        if (error.name === 'TokenExpiredError') {
            return next({ msg: 'Please login again', status: 401 })
        }
        return next({ msg: 'error', status: 500 })
    }
}

module.exports = routeGuard