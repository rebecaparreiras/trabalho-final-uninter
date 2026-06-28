import styles from './Spinner.module.css'

export default function Spinner({ tamanho = 32 }) {
  return (
    <div
      className={styles.spinner}
      style={{ width: tamanho, height: tamanho }}
      role="status"
      aria-label="Carregando"
    />
  )
}