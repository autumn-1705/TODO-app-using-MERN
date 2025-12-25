const mongoose = require('mongoose')
const TodoSchema = mongoose.Schema({
    name : String,
    completed : {type : Boolean, default : false}
})


const Todo = mongoose.model('practices',TodoSchema);

module.exports  = Todo