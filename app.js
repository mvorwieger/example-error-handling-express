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
