import { NavLink } from 'react-router-dom'
import styles from './NavWeb.module.css'

const links = [
  { para: '/web', rotulo: 'Início', fim: true },
  { para: '/web/cardapio', rotulo: 'Cardápio', fim: false },
  { para: '/web/fidelidade', rotulo: 'Fidelidade', fim: false },
  { para: '/web/unidades', rotulo: 'Nossas lojas', fim: false },
  { para: '/web/login', rotulo: 'Sua conta', fim: false },
  { para: '/web/pedido', rotulo: 'Meus pedidos', fim: false },
]

export default function NavWeb() {
  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      <div className={styles.inner}>
        {links.map(({ para, rotulo, fim }) => (
          <NavLink
            key={para}
            to={para}
            end={fim}
            className={({ isActive }) => `${styles.link} ${isActive ? styles.ativo : ''}`}
          >
            {rotulo}
          </NavLink>
        ))}
      </div>
    </nav>
  )
}

