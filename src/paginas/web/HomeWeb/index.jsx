import { Link } from 'react-router-dom'
import { ShoppingBag, Star, Truck, ShieldCheck, Leaf, BookOpen, ChevronRight } from 'lucide-react'
import { useUnidade, useUsuario } from '../../../contexto'
import { getProdutosPorUnidade, produtos } from '../../../dados'
import CardProduto from '../../../componentes/produto/CardProduto'
import styles from './HomeWeb.module.css'

export default function HomeWeb() {
  const { unidade } = useUnidade()
  const { usuario, logado } = useUsuario()

  const produtosBase = unidade
    ? getProdutosPorUnidade(unidade.id)
    : produtos.map((p) => ({ ...p, disponivelNaUnidade: false }))

  const destaques = produtosBase.slice(0, 6)

  const primeiroNome = logado ? usuario.nome.split(' ')[0] : 'visitante'

  return (
    <div className={styles.pagina}>

      {/* boas-vindas + fazer pedido */}
      <section className={styles.topo}>
        <div className={styles.topo_inner}>

          <div className={styles.card_boas_vindas}>
            <div className={styles.bv_texto}>
              <p className={styles.bv_ola}>Olá, {primeiroNome}!</p>
              <p className={styles.bv_sub}>Boas vindas ao<br />Raízes do Nordeste.</p>
            </div>
            <img src="/img/logo.png" alt="" aria-hidden="true" className={styles.bv_img} />
          </div>

          <Link to="/web/cardapio" className={styles.card_fazer_pedido}>
            <ShoppingBag size={28} aria-hidden="true" />
            <span className={styles.fp_titulo}>FAZER PEDIDO</span>
            <span className={styles.fp_sub}>Ver cardápio completo</span>
          </Link>

        </div>
      </section>

      {/* hero brand */}
      <section className={styles.hero}>
        <div className={styles.hero_inner}>
          <div className={styles.hero_texto}>
            <h1 className={styles.hero_titulo}>
              O verdadeiro sabor do Nordeste, perto de você!
            </h1>
            <p className={styles.hero_sub}>
              Petiscos típicos feitos com ingredientes selecionados.
            </p>
            <div className={styles.hero_ctas}>
              <Link to="/web/cardapio" className={styles.hero_btn}>
                <BookOpen size={16} aria-hidden="true" />
                Cardápio
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
              <Link to="/web/fidelidade" className={styles.hero_btn}>
                <Star size={16} aria-hidden="true" />
                Fidelidade
                <ChevronRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
          <div className={styles.hero_imagem_wrapper}>
            <img src="/img/banner-2.jpg" alt="Pratos nordestinos" className={styles.hero_img} />
          </div>
        </div>
      </section>

      {/* conteúdo */}
      <div className={styles.conteudo}>

        {/* destaques */}
        <section>
          <h2 className={styles.secao_titulo}>Nossos destaques</h2>
          <div className={styles.destaques_grid}>
            {destaques.map((produto) => (
              <CardProduto key={produto.id} produto={produto} rota="/web/cardapio" rotaExata />
            ))}
          </div>
        </section>

        {/* fidelidade */}
        <section className={styles.fidelidade_banner}>
          <div className={styles.fid_esq}>
            <Star size={40} className={styles.fid_star} aria-hidden="true" />
            <div>
              <strong className={styles.fid_titulo}>Programa de Fidelidade Raízes</strong>
              <p className={styles.fid_desc}>Acumule pontos em cada pedido e troque por benefícios exclusivos.</p>
            </div>
          </div>
          <Link to="/web/fidelidade" className={styles.fid_btn}>
            Ver meus pontos
            <ChevronRight size={16} aria-hidden="true" />
          </Link>
        </section>

        {/* bloco final */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <Truck size={24} aria-hidden="true" />
            <span>Entrega rápida</span>
          </div>
          <div className={styles.feature}>
            <ShieldCheck size={24} aria-hidden="true" />
            <span>Pagamento seguro</span>
          </div>
          <div className={styles.feature}>
            <Leaf size={24} aria-hidden="true" />
            <span>Ingredientes selecionados</span>
          </div>
        </div>

      </div>
    </div>
  )
}
