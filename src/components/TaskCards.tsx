import styles from './TaskCards.module.css'
import { Trash, Circle } from 'phosphor-react'
import { AiFillCheckCircle } from 'react-icons/ai'

interface taskProps {
  id: number
  task: string
  isFinished: boolean
  removeTask: (id: number) => void
  doneTask: (id: number) => void
}

export function TaskCards({doneTask, id, task, isFinished, removeTask}: taskProps) {
  function handleDeleteTask() {
    removeTask(id)
  }

  function handleDoneTask() {
    doneTask(id)
  }

  return (
    <div className={`${styles.card} ${isFinished ? styles.finished : ''}`}>
      {
        isFinished ? 
        <button onClick={handleDoneTask} className={styles.check}>
          <AiFillCheckCircle size={18} /> 
        </button>
        :
        <button onClick={handleDoneTask} className={styles.circle}>
          <Circle size={18} /> 
        </button>
      }
      <p>{task}</p>
      <button 
        onClick={handleDeleteTask} 
        className={styles.trashButton} 
        type='button'
      >
        <Trash size={18}/>
      </button>
    </div>
  )
}