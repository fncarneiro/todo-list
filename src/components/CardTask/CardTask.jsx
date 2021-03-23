import React, { useState } from "react";
import "./style.css";
import { ReactComponent as DeleteSVG } from "../../assets/img/delete.svg";
import { ReactComponent as CheckSVG } from "../../assets/img/check.svg";

export default function CardTask(props) {
  const [title, setTitle] = useState(props.title || '');
  const [task, setTask] = useState(props.task || '');
  const [isSaved, setIsSaved] = useState(true);

  function _handleChangeTask(event) {
    setTask(event.target.value);
    setIsSaved(false);
  }

  function _handleChangeTitle(event) {
    setTitle(event.target.value);
    setIsSaved(false);
  }

  function _deleteTask() {
    const idTask = props.idTask;       
    props.deleteTask(idTask);
  }

  function _updateTask() {
    const idTask = props.idTask;
    const idCategory = props.idCategory;
    const titleCard = title;
    const taskCard = task;
    props.updateTask(idTask, idCategory, titleCard, taskCard);
    setIsSaved(true);
  }

  return (
    <section className="card-note">
      <header className="card-note_header">
        <CheckSVG onClick={_updateTask} />
        <span>{!isSaved ? 'Not saved' : ''}</span>
        <DeleteSVG onClick={_deleteTask} />
      </header>
      <textarea
        className="card-note_inputTitle"
        value={title}
        maxLength={30}
        onChange={event => _handleChangeTitle(event)}
        placeholder={'Title'}
      />
      <textarea
        className="card-note_inputText"
        maxLength={100}
        value={task}
        onChange={event => _handleChangeTask(event)}
        placeholder={'Write you task...'}
      />
    </section>
  );
}



