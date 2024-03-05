const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required:true
    }
})

const TodoModel = mongoose.model("toDo", todoSchema);
module.exports = TodoModel;