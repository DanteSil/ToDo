import styles from './Header.module.css';
import Logo from '../assets/Logo_ToDo.svg'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={Logo} alt="Uma arte de foguete + a palavra ToDo" />
    </header>
  )
}