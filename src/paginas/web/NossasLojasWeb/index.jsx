import { useNavigate } from 'react-router-dom'
import { MapPin, Clock, ChevronRight } from 'lucide-react'
import { useUnidade } from '../../../contexto'
import { unidades } from '../../../dados'
import styles from './NossasLojasWeb.module.css'

export default function NossasLojasWeb() {
  const { unidade, selecionarUnidade } = useUnidade()
  const navigate = useNavigate()

  function selecionar(u) {
    selecionarUnidade(u)
    navigate('/web/cardapio')
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.conteudo}>

        <div className={styles.cabecalho}>
          <h1 className={styles.titulo}>Nossas lojas</h1>
          <p className={styles.subtitulo}>
            Selecione uma unidade para ver o cardápio com disponibilidade atualizada.
          </p>
        </div>

        <div className={styles.grid}>
          {unidades.map((u) => {
            const isSelecionada = unidade?.id === u.id
            return (
              <article
                key={u.id}
                className={isSelecionada ? `${styles.card} ${styles.card_ativo}` : styles.card}
                onClick={() => selecionar(u)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') selecionar(u) }}
              >
                <div className={styles.card_header}>
                  <div className={styles.card_topo}>
                    <MapPin size={18} className={styles.pin} aria-hidden="true" />
                    <strong className={styles.card_nome}>{u.nome}</strong>
                  </div>
                  {isSelecionada && (
                    <span className={styles.badge_ativo}>Selecionada</span>
                  )}
                </div>
                <div className={styles.card_info}>
                  <p className={styles.endereco}>{u.endereco}</p>
                  <p className={styles.bairro}>{u.bairro} · {u.estado}</p>
                  <div className={styles.horario}>
                    <Clock size={13} aria-hidden="true" />
                    <span>{u.horario}</span>
                  </div>
                </div>
                <div className={styles.card_rodape}>
                  <span className={u.aberta ? styles.aberta : styles.fechada}>
                    {u.aberta ? 'Aberta agora' : 'Fechada'}
                  </span>
                  <ChevronRight size={16} aria-hidden="true" />
                </div>
              </article>
            )
          })}
        </div>

      </div>
    </div>
  )
}