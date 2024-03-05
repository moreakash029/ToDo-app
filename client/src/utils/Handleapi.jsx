import axios from "axios";


const baseUrl = "http://localhost:3001"

const getAllToDo = (setToDo)=>{
    axios
    .get("http://localhost:3001/")
    .then((data)=> {
        console.log('data ----->',data.data);
        setToDo(data.data)
    })
}

const addToDo = (text,setText,setToDo)=>{
    axios
    .post("http://localhost:3001/save", {text})
    .then((data)=>{
        console.log(data);
        setText("")
        getAllToDo(setToDo)
    })
    .catch((err)=> console.log(err))
}

const updateToDo = (toDoId,text,setToDo,setText,setIsUpdating)=>{
    axios
    .post("http://localhost:3001/update", {_id:toDoId,text})
    .then((data)=>{
        console.log(data);
        setText("")
        setIsUpdating(false)
        getAllToDo(setToDo)
    })
    .catch((err)=> console.log(err))
}

const deleteTodo = (_id,setToDo)=>{
    axios
    .post("http://localhost:3001/delete", {_id})
    .then((data)=>{
        console.log(data);
        getAllToDo(setToDo)
    })
    .catch((err)=> console.log(err))
}

export {getAllToDo,addToDo,updateToDo,deleteTodo}