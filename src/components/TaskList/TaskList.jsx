import React from "react";
import CardTask from "../CardTask";
import "./style.css";

export default function TaskList(props) {

  function _keyGen(index, category, title, task) {
    return (category + title.substr(0, 10) + task.substr(0, 10) + index.toString());
  } 

  return (
    <div>
      {props.tasks.map((task, index) => {
        return (
          <div key={index}>
            <h4 className="category">
              {task.category.name}              
            </h4>

            <ul className="list-tasks">
              {task.tasks.map((taskNote, index) => {
                return (
                  <li className="list-tasks_item"
                    key={_keyGen(index, task.category.name, taskNote.title, taskNote.task)}>
                    <CardTask
                      deleteTask={props.deleteTask}
                      updateTask={props.updateTask}
                      idCategory={task.category.id}
                      idTask={taskNote.id}
                      title={taskNote.title}
                      task={taskNote.task}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
}