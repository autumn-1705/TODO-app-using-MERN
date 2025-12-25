const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const Todo = require('./models/Todo')

const PORT = 4008

app = express()

app.use(cors())
app.use(express.json())



mongoose.connect('mongodb://localhost:27017/practice')

app.get('/todo', async (req,res)=>{
const posts = await Todo.find();
res.json(posts);

}
)


app.post('/todo/add',async (req,res)=>{
    const newPost = await Todo.create(req.body);
    res.status(200).json(newPost);
})

app.delete('/todo/delete/:id',async (req,res)=>{
    const DelPost = await Todo.findByIdAndDelete(req.params.id);
    if(!DelPost){
        return res.send(404).json({message : "Todo not found"});
    }
    else
    res.json(DelPost)


})

app.put('/todo/complete/:id', async (req,res)=>{
    const todo = await Todo.findById(req.params.id);
    todo.completed = !todo.completed
    await todo.save();
    res.json(todo)
})


app.listen(PORT,()=>{
    console.log(`Server is running at http://localhost:4008`)
})
