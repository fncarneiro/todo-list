import React, { useState, useEffect } from 'react';
import './App.css';

import TaskList from './components/TaskList/TaskList';
import RegisterForm from './components/RegisterForm/RegisterForm';

export default function App() {

  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [hasError, setHasError] = useState({ msg: '', status: false });

  useEffect(() => {

    fetchApi('categories', 'GET')
      .then(
        (data) => { setCategories(data); })
  }, []);

  useEffect(() => {

    fetchApi('tasks', 'GET')
      .then(
        (data) => {
          const sortedTasks = data.sort(function (a, b) { return a.category.id - b.category.id });

          const groupedTasks = sortedTasks
            .map(rebuildTasks)
            .filter(groupTasks);

          setTasks(groupedTasks);
        }
      )
  }, [tasks]);

  function rebuildTasks(task) {
    return {
      category: task.category,
      tasks: [{
        id: task.id,
        title: task.title,
        task: task.task
      }]
    }
  }

  function groupTasks(task, index, tasks) {
    let objTask = {
      id: task.tasks[0].id,
      title: task.tasks[0].title,
      task: task.tasks[0].task
    }

    if (index === 0) {
      return task
    } else {
      if (tasks[index].category.id === tasks[index - 1].category.id) {
        const indexTask = tasks
          .findIndex((task) => task.category.id === tasks[index].category.id);

        tasks[indexTask].tasks.push(objTask);
      } else {
        return task
      }
    }
  }

  function fetchApi(endpoint, method, objBody) {
    const ApiUrl = 'http://localhost:8080/api/' + endpoint;
    const ApiConfig = {
      method: method,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(objBody)
    };

    return fetch(ApiUrl, ApiConfig)
      .then(
        (response) => response.json())
      .catch(error => {
        setHasError({ msg: `${ApiUrl} - ${error}`, status: false })
      })
  }


  function insertTask(idCategory, title, task) {
    const objApi = {
      title: title,
      task: task,
      category: {
        id: idCategory,
        name: ''
      }
    };

    fetchApi('task', 'POST', objApi);

  }

  function updateTask(idTask, idCategory, title, task) {
    const objApi = {
      id: idTask,
      title: title,
      task: task,
      category: {
        id: idCategory
      }
    };

    fetchApi('task', 'PUT', objApi);
  }

  function deleteTask(idTask) {
    const objApi = {
      id: idTask
    };

    fetchApi('task', 'DELETE', objApi);
  }

  return (
    <>
      <section className="title">
        <span> To Do List </span>
      </section >

      <section className="container-form">
        <RegisterForm
          categories={categories}
          newTask={insertTask}
        />
      </section>
      { hasError.status ? <h3 className="error">Error loadind {hasError.msg}...</h3> : ''}

      <section className="container-list">
        <TaskList
          deleteTask={deleteTask}
          updateTask={updateTask}
          tasks={tasks}
        />
      </section>
    </>
  );
}
