const { config } = require("dotenv");
const TodoModel = require("../models/toDoSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const jwtKey = process.env.JWT_SECRECT_KEY;

const getTodo = async (req, res) => {
  
    const email = req.decoded.email
    try {
    const toDo = await TodoModel.find({email});
    res.send(toDo);
  } catch (error) {
    res.send(error);
  }
};


const saveTodo = async (req, res) => {
  try {
    const { text } = req.body;
    const email = req.decoded.email
    const data = await TodoModel.create({ text,email });
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
    res.send(error);
  }
};

function verifyToken(req, res, next) {
  try {
    const token = req?.headers?.authorization?.split(" ")[1];
    if (token) {
      jwt.verify(token, jwtKey, (err, valid) => { 
        console.log(valid);
        if (err) {
          res.send("Please provide valid token");
        } else {
          req.decoded = valid;
          next();
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
}

module.exports = {
  verifyToken,
  getTodo,
  saveTodo,
  updateTodo,
  deleteTodo,
};
