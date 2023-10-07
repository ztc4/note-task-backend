const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const serverless = require('serverless-http');

require('dotenv').config()
//Connect to Database
require("./db/mongoose")
const port = process.env.PORT || 5000
//Insert routes
const UserRouter = require("./Routers/userRouter")
const TaskRouter = require("./Routers/TaskRouter")
const groupTask = require("./Routers/groupTaskRouter")

const app = express()
// app.listen(port, ()=> console.log("app is up"))
app.use(cors())
app.use(express.json())
require('dotenv').config()

app.use(UserRouter)
app.use(groupTask)
app.use(TaskRouter)
app.use(cookieParser())





// Login
app.get("/home", async(req, res)=>{

 res.cookie("zachary", "mekemdmdemeo").send("Page sent")

 
})

module.exports.handler = serverless(app);