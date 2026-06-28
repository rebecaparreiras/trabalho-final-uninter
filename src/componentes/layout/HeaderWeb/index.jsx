import { Link } from 'react-router-dom'
import { ShoppingBag } from 'lucide-react'
import { useCarrinho } from '../../../contexto'
import styles from './HeaderWeb.module.css'


export default function HeaderWeb() {
  const { totalItens } = useCarrinho()

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/web" className={styles.logo} aria-label="Raízes do Nordeste — Início">
          <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="" aria-hidden="true" className={styles.logo_icone} />
          <span className={styles.logo_nome}>Raízes do Nordeste</span>
        </Link>

        <Link
          to="/web/cardapio"
          className={styles.carrinho}
          aria-label={`Carrinho — ${totalItens} ${totalItens === 1 ? 'item' : 'itens'}`}
        >
          <ShoppingBag size={22} aria-hidden="true" />
          {totalItens > 0 && (
            <span className={styles.badge}>{totalItens > 9 ? '9+' : totalItens}</span>
          )}
        </Link>
      </div>
    </header>
  )
}