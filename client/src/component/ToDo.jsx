import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";

const ToDo = ({ text, updateMode, deleteTodo }) => {
  return (
   
    <div className="card text-bg-dark mb-3">
      <div className="card-body">
        <h5 className="card-title">{text}</h5>
        <BiEdit className="icon" onClick={updateMode} />
        <AiFillDelete className="icon" onClick={deleteTodo} />
      </div>
    </div>
  );
};

export default ToDo;
