const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
    title: {
        type: String,

    },
    details: {
        type: String,
        

    }, 
    completion: {
        type: Boolean,
        required: true,
        default: false,
    },
    category: {
        type: String,
        

    }, 
    owner:{
  
    },
    date:{
        type: String
    },
    time:{
        type:String
    },
    timezone:{
        type:String,
        default:"eastern"
    }
}, {timestamps:true})


const Task = mongoose.model("Task", taskSchema)

module.exports = Task
