const express = require("express")
const winston = require("winston")
const app = express()
// This module wraps all our routes in a A Error wrapper and delegates it to our ErrorMiddleware 
require("express-async-errors")

const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: "logfile.log" })
    ]
})

// To also log errors outside of the context of express we listen to global errors
winston.exceptions.handle(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
)

// We also want to handle Promise Rejections
process.on("unhandledRejection", err => {
    // We throw a error here so the error gets delegated to our "logger.handleExecptions"
    throw err;
})

app.use(express.json())

app.get("/testRoute", (res, req) => {
    throw new Error("test error 123")
})

// ErrorMiddleware
// You should move this error logging middleware in a seperate File
app.use((err, req, res, next) => {
    logger.error(err.message, err)
    res.status(500).send("Internal Server Error")
})

app.listen(3000, () => console.log("started at localhost:3000"))
