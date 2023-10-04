const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")

require('dotenv').config()
//Connect to Database
require("./db/mongoose")
const port = process.env.PORT || 5000
//Insert routes
const UserRouter = require("./Routers/userRouter")
const TaskRouter = require("./Routers/TaskRouter")
const groupTask = require("./Routers/groupTaskRouter")

const application = express()
application.listen(port, ()=> console.log("Application is up"))
application.use(cors())
application.use(express.json())
require('dotenv').config()

application.use(UserRouter)
application.use(groupTask)
application.use(TaskRouter)
application.use(cookieParser())





// Login
application.get("/home", async(req, res)=>{

 res.cookie("zachary", "mekemdmdemeo").send("Page sent")

 
})