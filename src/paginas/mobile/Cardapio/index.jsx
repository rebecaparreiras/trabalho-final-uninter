import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import CardProduto from '../../../componentes/produto/CardProduto'
import { useUnidade } from '../../../contexto'
import { categorias, getProdutosPorUnidade, produtos } from '../../../dados'
import styles from './Cardapio.module.css'

export default function Cardapio() {
  const { unidade } = useUnidade()
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [busca, setBusca] = useState('')
  const filtrosRef = useRef(null)

  useEffect(() => {
    const el = filtrosRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // se tiver unidade, pega os produtos com disponibilidade correta
  // se não tiver, mostra tudo como indisponível (pede pra selecionar)
  let produtosBase
  if (unidade) {
    produtosBase = getProdutosPorUnidade(unidade.id)
  } else {
    produtosBase = produtos.map((p) => ({ ...p, disponivelNaUnidade: false }))
  }

  // filtra por categoria e busca
  const produtosFiltrados = produtosBase.filter((p) => {
    const matchCategoria = categoriaAtiva === 'todos' || p.categoria === categoriaAtiva
    const matchBusca =
      busca === '' ||
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao.toLowerCase().includes(busca.toLowerCase())
    return matchCategoria && matchBusca
  })

  return (
    <>
      <HeaderMobile titulo="Cardápio" mostrarVoltar={true} />
      <main className={styles.main}>

        {/* barra da unidade selecionada - clica pra trocar */}
        <Link to="/unidades" className={styles.unidade_bar}>
          <MapPin size={14} aria-hidden="true" />
          <span>
            {unidade ? `${unidade.nome} · ${unidade.sigla}` : 'Selecionar unidade'}
          </span>
          <span className={styles.trocar}>Trocar</span>
        </Link>

        {/* campo de busca */}
        <div className={styles.busca_wrapper}>
          <Search size={16} className={styles.busca_icone} aria-hidden="true" />
          <input
            type="search"
            className={styles.busca}
            placeholder="Buscar no cardápio"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            
          />
        </div>

        {/* abas de categoria - rolagem horizontal */}
        <div ref={filtrosRef} className={styles.categorias}>
          <div style={{ display: 'flex', gap: '0.5rem', width: 'max-content' }}>
            <button
              className={categoriaAtiva === 'todos' ? `${styles.cat_btn} ${styles.cat_ativo}` : styles.cat_btn}
              onClick={() => setCategoriaAtiva('todos')}
            >
              Todos
            </button>
            {categorias.map((cat) => (
              <button
                key={cat.id}
                className={categoriaAtiva === cat.id ? `${styles.cat_btn} ${styles.cat_ativo}` : styles.cat_btn}
                onClick={() => setCategoriaAtiva(cat.id)}
              >
                {cat.nome}
              </button>
            ))}
          </div>
        </div>

        {/* aviso caso não tenha unidade selecionada */}
        {!unidade && (
          <div className={styles.aviso_sem_unidade}>
            <MapPin size={20} aria-hidden="true" />
            <p>
              <Link to="/unidades">Selecione uma unidade</Link> para ver a disponibilidade dos produtos.
            </p>
          </div>
        )}

        {/* grid de produtos */}
        {produtosFiltrados.length === 0 ? (
          <p className={styles.vazio}>Nenhum produto encontrado.</p>
        ) : (
          <div className={styles.grid}>
            {produtosFiltrados.map((produto) => (
              <CardProduto key={produto.id} produto={produto} />
            ))}
          </div>
        )}

      </main>
    </>
  )
}