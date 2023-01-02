import { Header } from "./components/Header"
import { TaskCards } from "./components/TaskCards"
import { PlusCircle } from 'phosphor-react'

import clipBoard from './assets/Clipboard.svg'

import "./global.css"
import styles from './App.module.css'

import { useEffect, useState } from "react"

interface tasks {
  id: number
  content: string
  isFinished: boolean
}

function App() {
  const [tasks, setTasks] = useState<tasks[]>(() => {
    const localResponse = localStorage.getItem("@todoList")
    if(!localResponse) {
      return []
    } else {
      return JSON.parse(localResponse)
    }
  })
  const [newTask, setNewTask] = useState('')

  function handleNewTask(){
    if(!newTask){
      return alert("Você não digitou uma tarefa!")
    }

    const task = {
      id: Math.floor(Math.random() * 1000),
      content: newTask,
      isFinished: false
    }

    setTasks([...tasks, task])
    setNewTask('')
  }

  function RemoveTask(id: number) {
    const tasksWithoutSelected = tasks.filter(task => task.id !== id)

    setTasks(tasksWithoutSelected)
  }

  function doneTask(id:number) {
    const toggleTask = tasks.filter(task => {
      if(task.id == id){
        task.isFinished = !task.isFinished
      }
      return task
    })
    setTasks(toggleTask)
  }

  useEffect(() => {
    localStorage.setItem("@todoList", JSON.stringify(tasks))
  }, [tasks])

  const doneTasks = tasks.filter(task => task.isFinished === true)
  const noTasks = tasks.length === 0

  return (
    <div className="App">
      <Header />
      <div className={styles.page}>
        <div className={styles.newTask}>
          <input value={newTask} onChange={e => setNewTask(e.target.value)} className={styles.input} type="text" placeholder="Adicione uma nova tarefa"/>
          <button onClick={handleNewTask} className={styles.button}>
            Criar
            <PlusCircle size={16}/>
          </button>
        </div>
        <div className={styles.content}>
          <p>Tarefas Criadas <span>{tasks.length}</span></p>
          <p className={styles.purpleWords}>Concluídas <span>{doneTasks.length}  de {tasks.length}</span></p>
        </div>
        {
          noTasks ?
          <div className={styles.empty}>
            <img src={clipBoard} alt="Desenhode uma prancheta" />
            <p>
              <span>Você ainda não tem tarefas cadastradas</span>
              <br/>
              Crie tarefas e organize seus itens a fazer
            </p>
          </div>
          :
          tasks.map(task => (
            <TaskCards 
              key={task.id}
              id={task.id}
              task={task.content}
              isFinished={task.isFinished}
              doneTask={doneTask}
              removeTask={RemoveTask}
            />
          ))
        }
      </div>
    </div>
  )
}

export default App
