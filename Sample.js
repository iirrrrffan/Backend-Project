const express = require('express')
const app = express()
const PORT = 3000;

app.use(express.json())

const users = [];

app.post('/users',(req,res)=>{
    const {name,email,username}=req.body
    const user = {id:users.length+ 1,name,email,username}
    users.push(user)
    res.json(user)

})

app.get('/users',(req,res)=>{
    res.json(users)
})

app.get('/users/:id',(req,res)=>{
    const userId = parseInt(req.params.id)
    const user = users.find((u)=> u.id ===userId)
    if(user){
        res.json(user)
    }else{
        res.status(404).json({erorr: 'User not Found'})    
    }
})

app.put('/users/:id',(req,res)=>{
    const userId = parseInt(req.params.id)
    const {name,email,username}= req.body;
    const userIndex = users.findIndex((u)=> u.id ===userId)
    if(userIndex !== -1){
        users[userIndex]= {id:userId,name,email,username}
        res.json({
            message:"user has been updated"
        })
    }else{
        res.status(404).json({erorr: 'User not found'}) 
    }
})

app.delete('/users/:id',(req,res)=>{
    const userId = parseInt(req.params.id)
    const userIndex = users.findIndex((u)=> u.id === userId)
    if(userIndex !== -1){
        const deleteuser = users.splice(userIndex,1)
        res.json(deleteuser[0])
    }else{
        res.status(404).json({ error: 'User not found' });
    }
})






app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})