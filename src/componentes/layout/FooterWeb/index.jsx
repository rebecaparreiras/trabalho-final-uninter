import { Link } from 'react-router-dom'
import styles from './FooterWeb.module.css'

export default function FooterWeb() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <p className={styles.copy}>
          {new Date().getFullYear()} Raízes do Nordeste. Todos os direitos reservados.
        </p>
        <nav className={styles.links} aria-label="Links legais">
          <Link to="/web/privacidade?aba=privacidade">Política de Privacidade</Link>
          <span aria-hidden="true">|</span>
          <Link to="/web/privacidade?aba=termos">Termos de Uso</Link>
          <span aria-hidden="true">|</span>
          <Link to="/web/privacidade?aba=lgpd">LGPD</Link>
        </nav>
      </div>
    </footer>
  )
}