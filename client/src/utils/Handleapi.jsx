import axios from "axios";

const getAllToDo = (setToDo) => {
    const token = localStorage.getItem("token");
    // console.log(token);
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  axios.get("http://localhost:3001/",config).then((data) => {
    console.log("data ----->", data.data);
    setToDo(data.data);
  })
};

const addToDo = (text, setText, setToDo) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  axios
    .post("http://localhost:3001/save", { text }, config)
    .then((data) => {
      console.log(data);
      setText("");
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const updateToDo = (toDoId, text, setToDo, setText, setIsUpdating) => {
  const token = localStorage.getItem("token");
  console.log("====>", token);
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  axios
    .post("http://localhost:3001/update", { _id: toDoId, text }, config)
    .then((data) => {
      console.log(data);
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

const deleteTodo = (_id, setToDo, key) => {
  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
  axios
    .post("http://localhost:3001/delete", { _id }, config)
    .then((data) => {
      console.log(data);
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteTodo };
