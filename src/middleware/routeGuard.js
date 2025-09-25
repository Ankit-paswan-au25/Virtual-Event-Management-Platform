const AppError = require('../utils/appError')

const routeGuard = async (req, res, next) => {
    try {
        console.log(req)
        //if superAdmin
        if (req.user.roleId == 3) {
            return next(new AppError('You are not authrised do this action', 403))
        }


    } catch (error) {


        return next(new AppError('Please Try Again later', 500))
    }
}

module.exports = routeGuard