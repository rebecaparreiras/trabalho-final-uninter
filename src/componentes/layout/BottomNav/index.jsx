import { NavLink } from 'react-router-dom'
import { Home, BookOpen, ShoppingBag, Star, User } from 'lucide-react'
import { useCarrinho } from '../../../contexto'
import styles from './BottomNav.module.css'

const itens = [
  { para: '/', icone: Home, rotulo: 'Início' },
  { para: '/cardapio', icone: BookOpen, rotulo: 'Cardápio' },
  { para: '/carrinho', icone: ShoppingBag, rotulo: 'Carrinho', comBadge: true},
  { para: '/fidelidade', icone: Star, rotulo: 'Fidelidade' },
  { para: '/login', icone: User, rotulo: 'Perfil' },
]

export default function BottomNav() {
  const { totalItens } = useCarrinho()

  return (
    <nav className={styles.nav} aria-label="Navegação principal">
      {itens.map(({ para, icone: Icone, rotulo, comBadge }) => (
        <NavLink
          key={para}
          to={para}
          end={para === '/'}
          className={({ isActive }) => `${styles.item} ${isActive ? styles.ativo : ''}`}
          aria-label={rotulo}
        >
          <div className={styles.icone_wrapper}>
            <Icone size={22} aria-hidden="true" />
            {comBadge && totalItens > 0 && (
              <span className={styles.badge} aria-label={`${totalItens} itens no carrinho`}>
                  {totalItens > 9 ? '9+' : totalItens}
                </span>
            )}
          </div>
          <span className={styles.rotulo}>{rotulo}</span>
        </NavLink>
      ))}
    </nav>
  )
}

