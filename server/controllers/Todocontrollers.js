const TodoModel = require("../models/toDoSchema");
const jwt = require("jsonwebtoken");
const jwtKey = process.env.JWT_SECRECT_KEY;

const getTodo = async (req, res) => {
  try {
    const toDo = await TodoModel.find();
    res.send(toDo);
  } catch (error) {
    res.send(error);
  }
};

const saveTodo = async (req, res) => {
  try {
    const { text } = req.body;
    console.log(text);
    const data = await TodoModel.create({ text });
    res.send(data);
  } catch (error) {
    res.send(error);
  }
};

const updateTodo = async (req, res) => {
  try {
    const { _id, text } = req.body;
    await TodoModel.findByIdAndUpdate(_id, { text });
    res.send("Updated suceesfully.....");
  } catch (error) {
    res.send(error);
  }
};

const deleteTodo = async (req, res) => {
  try {
    const { _id } = req.body;
    await TodoModel.findByIdAndDelete(_id);
    res.send("Deleted Sucessfully.....");
  } catch (error) {
    res.send(err);
  }
};

function verifyToken(req, res, next) {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, jwtKey, (err, valid) => {
        if (err) {
          res.send("Please provide valid token");
        } else {
          req.decoded = decoded;
          next();
        }
      });
    }
  } catch (error) {
    res.send(err);
  }
}

module.exports = {
  verifyToken,
  getTodo,
  saveTodo,
  updateTodo,
  deleteTodo,
};
