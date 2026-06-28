import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapPin, ChevronRight, ShoppingBag, BookOpen, Star, Shield } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import { useUnidade, useCarrinho, useUsuario } from '../../../contexto'
import { promocoes } from '../../../dados'
import styles from './Home.module.css'

export default function Home() {
  const { unidade } = useUnidade()
  const { itens, aplicarPromocao } = useCarrinho()
  const { usuario } = useUsuario()
  const navigate = useNavigate()
  const scrollRef = useRef(null)
  const [paginaAtiva, setPaginaAtiva] = useState(0)
  const [totalPaginas, setTotalPaginas] = useState(1)

  const LARGURA_CARD = 160 + 12 // width + gap

  const temPedidoAtivo = itens.length > 0

  const promosAtivas = promocoes.filter((p) => p.ativa)

  // calcula quantas páginas existem com base no tamanho real do container
  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    const cardsPorPagina = Math.floor(el.clientWidth / LARGURA_CARD) || 1
    setTotalPaginas(Math.ceil(promosAtivas.length / cardsPorPagina))
  }, [promosAtivas.length])

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

  // atualiza bullet ativo conforme scroll
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

  function irParaPagina(pagina) {
    const el = scrollRef.current
    if (!el) return
    const cardsPorPagina = Math.floor(el.clientWidth / LARGURA_CARD) || 1
    el.scrollTo({ left: pagina * cardsPorPagina * LARGURA_CARD, behavior: 'smooth' })
    setPaginaAtiva(pagina)
  }

  function clicarPromo(promo) {
    aplicarPromocao(promo)
    navigate('/cardapio')
  }

  function destinoCTA() {
    if (temPedidoAtivo) return '/pedido'
    if (unidade) return '/cardapio'
    return '/unidades'
  }

  return (
    <>
      <HeaderMobile />
      <main className={styles.main}>

        {/* banner de boas vindas */}
        <div className={styles.banner}>
          <div className={styles.banner_texto}>
            <h2 className={styles.saudacao}>Olá, {usuario.nome}!</h2>
            <p className={styles.banner_sub}>Boas vindas ao Raízes do Nordeste.</p>
          </div>
          <img
            src={`${import.meta.env.BASE_URL}img/banner-2.jpg`}
            alt="Prato típico nordestino"
            className={styles.banner_img}
          />
        </div>

        {/* CTA */}
        <Link to={destinoCTA()} className={styles.cta}>
          <div className={styles.cta_icone}>
            <ShoppingBag size={22} aria-hidden="true" />
          </div>
          <div className={styles.cta_texto}>
            <strong className={styles.cta_titulo}>
              {temPedidoAtivo ? 'ACOMPANHE SEU PEDIDO' : 'FAZER PEDIDO'}
            </strong>
            <span className={styles.cta_sub}>
              {temPedidoAtivo ? 'Em preparo na loja...' : 'Explore nosso cardápio'}
            </span>
          </div>
          <ChevronRight size={20} aria-hidden="true" />
        </Link>

        {/* unidade */}
        <section>
          <h2 className={styles.secao_titulo}>UNIDADE</h2>
          <Link to="/unidades" className={styles.card_unidade}>
            <MapPin size={20} className={styles.pin} aria-hidden="true" />
            <div className={styles.unidade_texto}>
              <strong>{unidade ? unidade.nome : 'Selecione sua unidade'}</strong>
              <span className={styles.unidade_sub}>
                {unidade ? `${unidade.bairro} · ${unidade.sigla}` : 'Ver unidades disponíveis'}
              </span>
            </div>
            <ChevronRight size={18} aria-hidden="true" />
          </Link>
        </section>

        {/* promoções: scroll horizontal com wheel + bullets */}
        <section>
          <h2 className={styles.secao_titulo}>PROMOÇÕES EM DESTAQUE</h2>
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
              {promosAtivas.map((promo) => (
                <button
                  key={promo.id}
                  className={styles.promo_card}
                  onClick={() => clicarPromo(promo)}
                >
                  <img src={promo.imagem} alt={promo.titulo} className={styles.promo_img} />
                  <div className={styles.promo_info}>
                    <span className={styles.promo_badge}>{promo.badge}</span>
                    <span className={styles.promo_titulo}>{promo.titulo}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

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

        {/* atalhos */}
        <section>
          <h2 className={styles.secao_titulo}>ATALHOS</h2>
          <div className={styles.atalhos_grid}>
            <Link to="/cardapio" className={styles.atalho}>
              <BookOpen size={20} aria-hidden="true" />
              <span>Cardápio</span>
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
            <Link to="/fidelidade" className={styles.atalho}>
              <Star size={20} aria-hidden="true" />
              <span>Fidelidade</span>
              <ChevronRight size={16} aria-hidden="true" />
            </Link>
          </div>
          <Link to="/privacidade" className={styles.atalho_lgpd}>
            <Shield size={18} className={styles.shield} aria-hidden="true" />
            <div>
              <strong>Seus dados estão protegidos</strong>
              <span>Política de Privacidade e LGPD</span>
            </div>
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </section>

      </main>
    </>
  )
}