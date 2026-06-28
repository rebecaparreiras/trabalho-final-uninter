import { Globe } from 'lucide-react'
import styles from './HeaderTotem.module.css'

export default function HeaderTotem({ subtitulo }) {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src="/img/logo.png" alt="Raízes do Nordeste" className={styles.logo_icone} />
        <div className={styles.logo_texto}>
          <span className={styles.logo_nome}>Raízes do Nordeste</span>
          {subtitulo && <span className={styles.subtitulo}>{subtitulo}</span>}
        </div>
      </div>

      <div className={styles.idioma} aria-label="Idioma: Português do Brasil">
        <Globe size={16} aria-hidden="true" />
         <span>PT-BR</span>
      </div>
    </header>
  )
}