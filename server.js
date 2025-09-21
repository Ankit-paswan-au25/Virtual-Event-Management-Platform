require('dotenv').config();
const app = require('./src/app.js');
const conn = require('./src/config/dbConnection.js')

process.on('uncaughtException', err => {
    console.log(err.name, err.message);
    console.log('unhandled rejection caught shutting down');
})

const Port = process.env.Port
conn()
const server = app.listen(Port, () => {
    console.log("listning", Port)
})

// if any unhandledRejection ,promise happen this will shut down the app
process.on('unhandledRejection', err => {
    console.log(err.name, err.message)
    console.log('unhandled rejection caught shutting down', err)
    server.close(() => { process.exit(1) })
})