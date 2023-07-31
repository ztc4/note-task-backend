const mongoose = require("mongoose")
mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://zachary4coats:z4cUnderOver2004!@cluster0.e3fahkv.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("Connected to the database")})

// /Users/zacha/mongodb/bin/mongod.exe --dbpath=/Users/zacha/mongodb-data