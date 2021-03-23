import React, { useState } from "react";
import "./style.css";

export default function RegisterForm(props) {     

  const [category, setCategory] = useState(52);
  const [title, setTitle] = useState('');
  const [task, setTask] = useState('');

  function _handleChangeCategory(event) {          
    setCategory(event.target.value);    
  }

  function _handleChangeTitle(event) {    
    setTitle(event.target.value);  
  }

  function _handleChangeTask(event) {    
    setTask(event.target.value);
  }

  function _newTask(event) {
    event.preventDefault();         
    props.newTask(category, title, task);  
    setTitle(''); 
    setTask('');
  }

  return (
    <form       
      className="form"
      onSubmit={event => _newTask(event)}
    >
      <select
        onChange={event => _handleChangeCategory(event)}
        className="form-input"
      >
        {props.categories.map((category, index) => {
            return (
              <option key={index} value={ category.id }> {category.name} </option>
            )
        })}       
      </select>
      <input
        type="text"
        maxLength={30}
        placeholder="Title"
        className="form-input"
        onChange={event => _handleChangeTitle(event)}
        value={title}
      />
      <input
        placeholder="Write your task..."
        maxLength={100}
        className="form-input_task"
        onChange={event => _handleChangeTask(event)}
        value={task}
      />
      <button
        className="form-button"        
      >
        New Task
        </button>
    </form>
  );
}