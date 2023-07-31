const mongoose = require("mongoose")



const GroupTaskSchema = new mongoose.Schema({
    name:{
        type: String,
    },
    owner:{
        
    },
    password:{
        type: String,
        required: true,
    },
    members:[
        
    ],
    tasks:[{
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
            required: true,
            default:"Work"
    
        }, 
        date:{
            type: String
        },
        time:{
            type:String
        },timezone:{
            type:String,
            default:"Eastern"
        }
    }],

})
GroupTaskSchema.post("save", async function(next){
    if(this.members.length === 0){
        GroupTask.findByIdAndDelete(this._id).then(()=> console.log("deleted")).catch(()=> console.log("couldn't delete"))

     }
 

})

const GroupTask = mongoose.model("Group-Task",GroupTaskSchema)
module.exports =  GroupTask