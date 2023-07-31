const mongoose = require("mongoose")
const validator = require("validator")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const userSchema = new mongoose.Schema({
    firstname: {
        type: String, 
        required: true,
        trim: true,

    },
    lastname:{
        type: String, 
        required: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 8,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        },
    },
    email:{
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    timezone:{
        type:String,
        default:"eastern"
    },
    tokens: [{
        token:{
            type:String,
            required: true,
        }
    }], 
    groups:[
        
    ]

    ,

})



userSchema.statics.Login = async(username, password)=>{

    try{const user = await User.findOne({username: username})
    console.log(user)
    if(!user){
      throw new Error("User doesn't exist")
    }
    const isMatch = await bcrypt.compare(password, user.password);
    console.log(isMatch)
    if(!isMatch){
        throw new Error("Wrong password");
    }

    return user}
    catch(e){
        
    }
}



//generate a token
userSchema.methods.generateAuthToken = async function(){
    const token = jwt.sign({_id: this._id.toString()}, process.env.JWTPASS)
    this.tokens = this.tokens.concat({token})
    await this.save()
    return token
}


//Hash password before Saving

userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 8)
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User