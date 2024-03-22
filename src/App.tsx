import React, { useState } from 'react';

// CSS
import styles from './App.module.css';

// Components
import Footer from './components/Footer';
import Header from './components/Header';
import Modal from './components/Modal';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

// Interface
import { ITask } from './interfaces/Task';

function App() {
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [taskToUpdate, setTaskToUpdate] = useState<ITask | null>(null);

  const deletTask = (id: number) => {
    setTaskList(
      taskList.filter(task => {
        return task.id !== id
      })
    );
  }

  const hideOrShowModal = (display: boolean) => {
    const modal = document.querySelector('#modal')
    if (display) {
      modal!.classList.remove("hide")
    } else {
      modal!.classList.add("hide")
    }
  }

  const editTask = (task: ITask): void => {
    hideOrShowModal(true);
    setTaskToUpdate(task);
  };

  const updateTask = (taskUpadated: ITask): void => {
    console.log(taskUpadated)

    const upadatedItems = taskList.map((task) => {
      return task.id === taskUpadated.id ? taskUpadated : task;
    });

    setTaskList(upadatedItems);
    hideOrShowModal(false);
  }
  // const updateTask = (id: number, title: string, difficulty: number) => {
  //   const updatedTask: ITask = { id, title, difficulty };

  //   const updatedItems = taskList.map((task) => {
  //     return task.id === updatedTask.id ? updatedTask : task;
  //   });

  //   setTaskList(updatedItems);

  //   hideOrShowModal(false);
  // };

  return (
    <div className={styles.body}>
      <Modal children={<TaskForm btnText='Editar tarefa' task={taskToUpdate} handleUpdate={updateTask} taskList={taskList} />} />
      <Header />
      <main className={styles.main}>
        <div>
          <h2>O que voçê vai fazer?</h2>
          <TaskForm btnText='Criar tarefa' taskList={taskList} setTaskList={setTaskList} />
        </div>
        <div>
          <h2>Suas tarefas:</h2>
          <TaskList taskList={taskList} handleDelet={deletTask} handleEdit={editTask} />
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default App;
