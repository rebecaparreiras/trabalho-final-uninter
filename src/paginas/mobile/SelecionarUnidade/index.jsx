import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, MapPin, Clock, Check } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import { useUnidade } from '../../../contexto'
import { unidades } from '../../../dados'
import styles from './SelecionarUnidade.module.css'

export default function SelecionarUnidade() {
  const { unidade: unidadeAtual, selecionarUnidade } = useUnidade()
  const navigate = useNavigate()
  const [busca, setBusca] = useState('')

  // filtra as unidades pelo texto digitado (nome, bairro ou estado)
  const unidadesFiltradas = unidades.filter((u) => {
    const texto = busca.toLowerCase()
    return (
      u.nome.toLowerCase().includes(texto) ||
      u.bairro.toLowerCase().includes(texto) ||
      u.estado.toLowerCase().includes(texto)
    )
  })

  function selecionar(unidade) {
    selecionarUnidade(unidade)
    navigate('/cardapio') // vai direto pro cardápio depois de selecionar
  }

  return (
    <>
      <HeaderMobile titulo="Selecionar unidade" mostrarVoltar={true} mostrarNotificacao={false} />
      <main className={styles.main}>

        <p className={styles.descricao}>
          Escolha a unidade mais próxima para ver o cardápio disponível.
        </p>

        {/* campo de busca */}
        <div className={styles.busca_wrapper}>
          <Search size={18} className={styles.busca_icone} aria-hidden="true" />
          <input
            type="search"
            className={styles.busca}
            placeholder="Buscar por cidade ou bairro"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
          />
        </div>

        {unidadesFiltradas.length === 0 ? (
          <p className={styles.vazio}>Nenhuma unidade encontrada.</p>
        ) : (
          <ul className={styles.lista} role="list">
            {unidadesFiltradas.map((u) => {
              const estaSelecionada = unidadeAtual?.id === u.id
              return (
                <li key={u.id}>
                  <button
                    className={estaSelecionada ? `${styles.card} ${styles.card_ativo}` : styles.card}
                    onClick={() => selecionar(u)}
                  >
                    <div className={styles.card_icone_wrapper}>
                      <MapPin size={20} className={styles.card_pin} aria-hidden="true" />
                    </div>
                    <div className={styles.card_info}>
                      <div className={styles.card_header}>
                        <strong className={styles.card_nome}>{u.nome}</strong>
                        {estaSelecionada && (
                          <Check size={16} className={styles.check} aria-label="Selecionada" />
                        )}
                      </div>
                      <span className={styles.card_endereco}>{u.endereco}</span>
                      <div className={styles.card_meta}>
                        <Clock size={12} aria-hidden="true" />
                        <span>{u.horario}</span>
                        <span className={u.aberta ? styles.aberta : styles.fechada}>
                          {u.aberta ? 'Aberta' : 'Fechada'}
                        </span>
                      </div>
                    </div>
                  </button>
                </li>
              )
            })}
          </ul>
        )}
      </main>
    </>
  )
}