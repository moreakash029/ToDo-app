const TodoModel = require("../models/toDoSchema");



module.exports.getTodo = async (req, res) => {
  const toDo = await TodoModel.find();
  res.send(toDo);
};


module.exports.saveTodo = async (req, res) => {
  const { text } = req.body;
  console.log(text);
  await TodoModel.create({ text })
  .then((data) => {
    console.log(data);
    console.log("Added Sucessfully");
    res.send(data)
  })
  .catch((err) => res.send(err));
};


module.exports.updateTodo = async (req, res) => {
  const { _id, text } = req.body;
  await TodoModel.findByIdAndUpdate(_id, { text })
    .then(() => res.send("Updated suceesfully....."))
    .catch((err) => console.log(err));
};

module.exports.deleteTodo = async (req, res) => {
  const { _id } = req.body;
  await TodoModel.findByIdAndDelete(_id)
    .then(() => res.send("Deleted Sucessfully....."))
    .catch((err) => console.log(err));
};
