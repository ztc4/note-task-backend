const express = require("express")
const User = require("../Models/user")
const Auth = require("../MiddleWare/AuthJWT")


const router = new express.Router()


// Create Account
router.post("/user/signup", async(req,res)=>{
     const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password,
        email: req.body.email})

        if(!user){
            return res.status(404).send("Failed to create user")
        }
        try{await user.save()
        const token = await user.generateAuthToken()
        console.log(token)
        res.status(200).send({token})}
        catch(e){
            console.log(e)
            res.status(500).send("Couldn't create account")
        }
        


})

// Login

router.post("/user/login", async( req,res)=>{
try{    const user = await User.Login(req.body.username, req.body.password)
    console.log(user)
    if(user == false){
        throw new Error("User wasn't found")
    }
    const token = await user.generateAuthToken()
    console.log(token)
    res.status(200).send({token})
    console.log("success")
    }
catch(error){
    console.log("COuldn't get data")
    console.log(1, error)
    res.status(406).send({error: "Unable to login"})
    }
})
//logout
router.post("/user/logout", Auth, async (req,res) =>{
    try{let user = await req.user 
    user.tokens = user.tokens.filter(current => current.token !== req.token)
    await user.save()
    res.status(200).send("complete")}catch(e){
        res.status(500).send(e)
    }
})



router.post("/user/checklogin", Auth, async(req,res)=>{
    res.send("User is logged in")
})


module.exports = router


