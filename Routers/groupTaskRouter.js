const express = require("express")
const mongoose = require("mongoose")
const Task = require("../Models/task")
const Auth = require("../MiddleWare/AuthJWT")
const User = require("../Models/user")
const GroupTask = require("../Models/group")
const router = new express.Router()

//Create Group
router.post("/group/create", Auth ,async(req,res)=>{
    try{
        let group = new GroupTask({
            owner: req.user._id,
            name: req.body.name,
            password: req.body.password
        })
        req.user.groups.push(group._id)
        group.members.push(req.user._id)
        
        await group.save()
        await req.user.save()
        res.status(200).send({group})

    }catch(e){
        res.status(404).send({error: "There was an error"})

    }

})

//Join a Group
router.post("/group/join", Auth, async(req,res)=>{
    if(req.user.groups.includes())
    try{
        let group = await GroupTask.findOne({_id: req.body._id, password: req.body.password})
        console.log(group)
        if(group == undefined){
            throw new Error("Wasn't able to find the group")
        }
        if((req.user.groups.includes(group._id)) && group.members.includes(req.user._id)){
            throw new Error("Already in group")
        }
        group.members.push(req.user._id)
        req.user.groups.push(group._id)
        await req.user.save()
        await group.save()
        res.status(200).send("Group successfully joined")
    }
    catch(e){
        res.status(404).send({error: "Unable to find the group"})

    }
})
//getEachGroup
router.get("/group/get", Auth ,async(req,res)=>{
try{    const groups = req.user.groups
    if(!groups){
        res.status(200).send(" You haven't joined any groups")
    }

    let allGroups = []
    for(let i = 0; i < groups.length; i++){
        let group = await GroupTask.findOne({_id: groups[i]});
        if(!group){
            continue
        }
        const g = {Name:group.name,_id: group._id, password: group.password, members: group.members}
        allGroups.push(g)
        console.log(allGroups)
        
            
        };
  


    res.status(200).send(allGroups)}
    catch(e){
        
    }

})

//Get task
router.get("/group/getTask", Auth, async(req,res)=>{
     try{  const groups = req.user.groups
    if(!groups){
        res.status(200).send(" You haven't joined any groups")
    }

    let tasks = [];

    for(let i = 0; i < groups.length; i++){
        let group = await GroupTask.findOne({_id: groups[i]});
        if(!group){
            continue
        }
        tasks.push(...group.tasks)
        
            
        }
  


    res.json(tasks).status(200)}catch(e){
        
    }

})

router.post("/groupTask/find", Auth , async(req,res)=>{
    console.log(req.body._id)
    let task = await GroupTask.findOne({"tasks._id": req.body._id})
   task = task.tasks.filter(current => { if(current._id == req.body._id){
        return current
    }
    
})
    console.log(task)


    if(!task){
       res.send("couldn't get task")
    }
    res.json({task}).status(200)
   
   
   })


//Create Task for group
router.post("/group/createTask", Auth, async (req,res)=>{
    console.log("creating group task")
    console.log("trying to create group taks")
    const group = await GroupTask.findOne({_id: req.body._id, members: req.user._id})
    console.log(group)
    const task = { title: req.body.title,
         details: req.body.details,
          completion:req.body.completion,
           category: req.body.category
           ,timezone:req.user.timezone,
            date: req.body.date,time:req.body.time, groupid: group._id}
    group.tasks.push(task)
    console.log(group.tasks)
    await group.save()
    res.send({group})

})

// edit Task

router.put("/group/edit", Auth, async(req,res)=>{

   try {let task = await GroupTask.findOne({"tasks._id": req.body._id});
    let index;
    task.tasks.forEach((task,currentIndex) => {
        if(task._id.toString() === req.body._id){
            index = currentIndex
        }
        

    })
    task.tasks[index].title = req.body.title
    task.tasks[index].details = req.body.details
    task.tasks[index].completion = req.body.completion
    task.tasks[index].date = req.body.date
    task.save()
    res.status(200)
}
    catch(e){
        res.status(404)
    }

     
})


router.put("/group/markcomplete", Auth, async(req,res)=>{
    console.log("request sent")
    try {
    let task = await GroupTask.findOne({"tasks._id": req.body._id});
    console.log(task)
    let index;
    task.tasks.forEach((task,currentIndex) => {
        if(task._id.toString() === req.body._id){
            index = currentIndex
        }
        

    })
    console.log("completion", task.tasks[index].completion)
    task.tasks[index].completion = req.body.completion
    task.save()
    res.status(200)
    console.log(task.tasks[index])
}
    catch(e){
        res.status(404)
    }
    
})
// groupTask.delete

router.delete("/group/delete", Auth, async(req,res)=>{

    let task = await GroupTask.findOne({"tasks._id": req.body._id});
    let index;
    task.tasks.forEach((task,currentIndex) => {
        if(task._id.toString() === req.body._id){
            index = currentIndex
        }
        

    })

    task.tasks.splice([index], 1)
    task.save()

     
})


//Leave group

router.delete("/groups/leave", Auth, async(req,res)=>{
    console.log("id",req.body._id)
    const group = await GroupTask.findOne({_id: req.body._id})
    req.user.groups = req.user.groups.filter(current => {if(current.toString() !== req.body._id.toString()){
        return current
    }})
    
    let filter = group.members.filter(current => {if(current._id.toString() !== req.user._id.toString()){
        return current
    }})
    group.members = filter

        group.save()
        req.user.save()

    console.log("Successfully deleted")

    
    res.status(200)


})


module.exports = router