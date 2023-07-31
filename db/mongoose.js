const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect(process.env.DATABASE).then(()=>{console.log("Connected to the database")})

