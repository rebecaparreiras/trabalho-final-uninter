import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, CheckCircle2, ShoppingBag, BookOpen, Star, Shield } from 'lucide-react'
import HeaderTotem from '../../../componentes/layout/HeaderTotem'
import { useUnidade, useCarrinho } from '../../../contexto'
import { unidades, produtos } from '../../../dados'
import styles from './HomeTotem.module.css'

export default function HomeTotem() {
  const { selecionarUnidade, unidade } = useUnidade()
  const { adicionarItem } = useCarrinho()
  const scrollRef = useRef(null)
  const [paginaAtiva, setPaginaAtiva] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const LARGURA_CARD = 140 + 12 // width + gap

  // o totem está fisicamente numa loja, então auto-seleciona a primeira unidade
  useEffect(() => {
    if (!unidade) {
      selecionarUnidade(unidades[0])
    }
  }, [])

  const destaques = produtos.filter((p) => p.disponivel).slice(0, 6)

  // calcula quantas "páginas" existem com base no tamanho real do container
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const cardsPorPagina = Math.floor(el.clientWidth / LARGURA_CARD) || 1
    setTotalPaginas(Math.ceil(destaques.length / cardsPorPagina))
  }, [destaques.length])

  // converte scroll vertical do mouse em horizontal
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onWheel = (e) => {
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [])

  // atualiza o bullet ativo conforme o usuário scrolla
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const onScroll = () => {
      const paginaLargura = Math.floor(el.clientWidth / LARGURA_CARD) * LARGURA_CARD
      const pagina = Math.round(el.scrollLeft / paginaLargura)
      setPaginaAtiva(pagina)
    }
    el.addEventListener('scroll', onScroll)
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  function adicionarAoCarrinho(produto) {
    const personalizacoesPadrao = {}
    produto.personalizacoes.forEach((custom) => {
      if (custom.obrigatorio && custom.opcoes.length > 0) {
        personalizacoesPadrao[custom.id] = custom.opcoes[0].id
      }
    })
    adicionarItem(produto, 1, personalizacoesPadrao, '')
  }

  function irParaPagina(pagina) {
    const el = scrollRef.current
    if (!el) return
    const cardsPorPagina = Math.floor(el.clientWidth / LARGURA_CARD) || 1
    el.scrollTo({ left: pagina * cardsPorPagina * LARGURA_CARD, behavior: 'smooth' })
    setPaginaAtiva(pagina)
  }

  return (
    <div className={styles.pagina}>
      <HeaderTotem />

      <main className={styles.main}>

        {/* banner de boas vindas com imagem */}
        <div className={styles.banner}>
          <div className={styles.banner_texto}>
            <h2 className={styles.banner_titulo}>Olá, seja bem-vindo!</h2>
            <p className={styles.banner_sub}>Monte o seu pedido de forma rápida e fácil.</p>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}img/banner-2.jpg`}
            alt="Prato típico nordestino"
            className={styles.banner_img}
          />
        </div>

        {/* unidade */}
        <div className={styles.unidade_card}>
          <div className={styles.unidade_esq}>
            <span className={styles.unidade_label}>Unidade</span>
            <div className={styles.unidade_linha}>
              <MapPin size={16} className={styles.unidade_pin} aria-hidden="true" />
              <strong className={styles.unidade_nome}>
                {unidade ? `${unidade.bairro}, ${unidade.estado}` : 'Selecionando…'}
              </strong>
            </div>
          </div>
          <CheckCircle2 size={28} className={styles.unidade_check} aria-hidden="true" />
        </div>

        {/* CTA principal */}
        <Link to="/totem/cardapio" className={styles.cta}>
          <ShoppingBag size={26} aria-hidden="true" />
          <span>TOQUE PARA INICIAR PEDIDO</span>
        </Link>

        {/* produtos em destaque — scroll horizontal com bullets */}
        <section>
          <h2 className={styles.secao_titulo}>Promoções em destaque</h2>

          <div
            ref={scrollRef}
            style={{
              overflowX: 'scroll',
              WebkitOverflowScrolling: 'touch',
              scrollbarWidth: 'none',
              msOverflowStyle: 'none',
            }}
          >
            <div style={{ display: 'flex', gap: '12px', width: 'max-content', paddingBottom: '4px' }}>
              {destaques.map((produto) => (
                <article key={produto.id} className={styles.produto_card}>
                  <img src={produto.imagem} alt={produto.nome} className={styles.produto_img} />
                  <div className={styles.produto_info}>
                    <span className={styles.produto_nome}>{produto.nome}</span>
                    <span className={styles.produto_desc}>{produto.descricao}</span>
                    <span className={styles.produto_preco}>
                      R$ {produto.preco.toFixed(2).replace('.', ',')}
                    </span>
                    <button
                      className={styles.produto_btn}
                      onClick={() => adicionarAoCarrinho(produto)}
                    >
                      + Adicionar
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* bullets */}
          {totalPaginas > 1 && (
            <div className={styles.bullets}>
              {Array.from({ length: totalPaginas }, (_, i) => (
                <button
                  key={i}
                  className={i === paginaAtiva ? styles.bullet_ativo : styles.bullet}
                  onClick={() => irParaPagina(i)}
                  aria-label={`Página ${i + 1}`}
                />
              ))}
            </div>
          )}
        </section>

        {/* atalhos rápidos */}
        <section>
          <h2 className={styles.secao_titulo}>Acessos rápidos</h2>
          <div className={styles.atalhos}>
            <Link to="/totem/cardapio" className={styles.atalho}>
              <BookOpen size={20} aria-hidden="true" />
              <span>Cardápio</span>
            </Link>
            <Link to="/totem/fidelidade" className={styles.atalho}>
              <Star size={20} aria-hidden="true" />
              <span>Fidelidade</span>
            </Link>
          </div>
        </section>

        {/* rodapé de segurança */}
        <footer className={styles.rodape}>
          <Shield size={14} aria-hidden="true" />
          <span>Ambiente seguro. Seus dados estão protegidos.</span>
        </footer>

      </main>
    </div>
  )
}