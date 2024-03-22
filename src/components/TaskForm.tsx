import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';

// CSS
import styles from './TaskForm.module.css';

// Interface
import { ITask } from '../interfaces/Task';

type Props = {
    btnText: string;
    taskList: ITask[];
    setTaskList?: React.Dispatch<React.SetStateAction<ITask[]>>;
    task?: ITask | null;
    handleUpdate?(task: ITask): void;
}

const TaskForm = ({ btnText, taskList, setTaskList, task, handleUpdate }: Props) => {
    const [id, setId] = useState<number>(0);
    const [title, setTitle] = useState<string>("");
    const [difficulty, setDifficulty] = useState<number>(0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (task) {
            setId(task.id)
            setTitle(task.title)
            setDifficulty(task.difficulty)
        }
    }, [task])

    const submitTaskForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (title === ""){
            setError("Você precisa informar um titulo")
            return
        } else if (difficulty < 0){
            setError("A dificuldade não pode ser menor que zero")
            return
        }

        if (handleUpdate) {
            const newTask: ITask = { id, title, difficulty }

            handleUpdate(newTask);

            setError("");
        } else {
            const id = Math.floor(Math.random() * 1000)
            const newTask: ITask = { id, title, difficulty };

            setTaskList!([...taskList, newTask]);

            console.log(taskList)

            setTitle("");
            setDifficulty(0);
            setError("");
        }

    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.name === "title") {
            setTitle(e.target.value)
        } else if (e.target.name === "difficulty") {
            setDifficulty(parseInt(e.target.value))
        } else {
            console.error("Campo não mapeado")
        }

    }

    return (
        <form onSubmit={submitTaskForm} className={styles.form}>
            <div className={styles.input_container}>
                <label htmlFor="title">Título:</label>
                <input
                    type="text"
                    name='title'
                    placeholder='Título da tarefa'
                    value={title}
                    onChange={handleChange}
                />
            </div>
            <div className={styles.input_container}>
                <label htmlFor="difficulty">Dificuldade:</label>
                <input
                    type="number"
                    name='difficulty'
                    placeholder='Dificuldade da tarefa'
                    value={difficulty}
                    onChange={handleChange}
                />
            </div>
            <input type="submit" value={btnText} />
            {error && <p className={styles.error}>{error}</p>}
        </form>
    )
}

export default TaskForm