const express = require("express")
const app = express()

app.use(express.json())

app.route("/testRoute/:id", (res, req) => {

})

// You should move this error logging middleware in a seperate File
app.use((err, req, res, next) => {
    res.status(500).send("Internal Server Error")
})
