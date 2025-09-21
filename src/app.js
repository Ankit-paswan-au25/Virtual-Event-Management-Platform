//server dependencies=========================================================================
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

//error handlers=================================================================================
const globalErrorHandler = require('./controller/errorController');
const AppError = require('./utils/appError');

//middlewares===================================================================================
const sessionGuard = require('./middleware/sessionGuard');
const routeGuard = require('./middleware/routeGuard');

// Routes imports=================================================================================
const auth = require('./routes/authRoute');
const userRoutes = require('./routes/userRoute');
const eventsRoutes = require('./routes/eventRoute')
const participants = require('./routes/joinerRoute')


//parsers =========================================================================================
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));


//api without token =================================================================================
app.use('/api/v1/auth', auth)

//middleware ==========================================================================================
app.use(sessionGuard)
//app.use(routeGuard)

//Routes=======================================================================================================
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/events', eventsRoutes)
app.use('/api/v1/participants', participants)




//api which is not present here ==================================================================================

app.all('/{*splat}', (req, res, next) => {

    next(new AppError(`${req.originalUrl} not found on this server`, 404))
});


// global error handler
app.use(globalErrorHandler);



module.exports = app



