const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const routes = require("./routes/ToDoRoutes");
const EmployeeModel = require("./models/employee");

const jwtKey = process.env.JWT_SECRECT_KEY;

const app = express();

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log(`Connected to Monogodb....`))
  .catch((err) => console.log(err));

app.use(routes);

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await EmployeeModel.findOne({
      email: email,
      password: password,
    });
    if (!user) {
      throw Error("No Record Existed");
    }
    const token = jwt.sign(
      {
        email: user.email,
      },
      jwtKey,
      { expiresIn: "1h" }
    );

    res.send({ user, auth: token, code: 200 });
  } catch (error) {
    res.send({
      error: error.message,
      code: 400,
      message: "failed",
    });
  }
});

app.post("/register", (req, res) => {
  const { name, email } = req.body;
  EmployeeModel.findOne({ name: name, email: email }).then((user) => {
    if (user) {
      if (user.name === name) {
        res.json("Username already exists");
      } else if (user.email === email) {
        res.json("Email id already exists");
      }
    } else {
      let newUser = EmployeeModel.create(req.body);
      jwt.sign({ newUser }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send({ newUser: "something went wrong" });
        }
        res.send({ newUser, auth: token });
      });
    }
  });
});




const PORT = 3001;

app.listen(PORT, () => {
  console.log("server is connected");
});

