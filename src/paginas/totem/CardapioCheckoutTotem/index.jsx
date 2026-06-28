import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Search, ShoppingBag, Home } from 'lucide-react'
import HeaderTotem from '../../../componentes/layout/HeaderTotem'
import CardProduto from '../../../componentes/produto/CardProduto'
import { useCarrinho, useUnidade } from '../../../contexto'
import { categorias, getProdutosPorUnidade, produtos } from '../../../dados'
import styles from './CardapioCheckoutTotem.module.css'

export default function CardapioCheckoutTotem() {
  const { unidade } = useUnidade()
  const { itens, subtotal, desconto, total, atualizarQuantidade, removerItem } = useCarrinho()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [metodoPagamento, setMetodoPagamento] = useState('credito')
  const [aceitaTermos, setAceitaTermos] = useState(false)
  const [aceitaProcessamento, setAceitaProcessamento] = useState(false)

  // painel direito: carrinho ou checkout
  const etapa = searchParams.get('etapa') || 'carrinho'

  // no totem a unidade é auto selecionada pelo HomeTotem
  let produtosBase
  if (unidade) {
    produtosBase = getProdutosPorUnidade(unidade.id)
  } else {
    produtosBase = produtos.map((p) => ({ ...p, disponivelNaUnidade: false }))
  }

  const produtosFiltrados = produtosBase.filter((p) => {
    const matchCat = categoriaAtiva === 'todos' || p.categoria === categoriaAtiva
    const matchBusca = busca === '' || p.nome.toLowerCase().includes(busca.toLowerCase())
    return matchCat && matchBusca
  })


  function irParaCheckout() {
    setSearchParams({ etapa: 'checkout' })
  }

  function voltarCarrinho() {
    setSearchParams({})
  }

  function pagar() {
    navigate('/totem/pagamento', { state: { metodoPagamento } })
  }

  return (
    <div className={styles.pagina}>
      <HeaderTotem subtitulo="Cardápio" />

      <div className={styles.layout}>

        {/* ESQUERDA - produtos */}
        <div className={styles.painel_esquerdo}>

          {/* busca */}
          <div className={styles.busca_wrapper}>
            <Search size={18} className={styles.busca_icone} aria-hidden="true" />
            <input
              type="search"
              className={styles.busca}
              placeholder="Buscar produto"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          {/* categorias */}
          <nav className={styles.categorias}>
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
          </nav>

          {/* grid de produtos - 2 colunas no totem */}
          {produtosFiltrados.length === 0 ? (
            <p className={styles.vazio}>Nenhum produto encontrado.</p>
          ) : (
            <div className={styles.grid}>
              {produtosFiltrados.map((produto) => (
                <CardProduto
                  key={produto.id}
                  produto={produto}
                  rota="/totem/cardapio"
                />
              ))}
            </div>
          )}
        </div>

        {/* DIREITA - carrinho/checkout */}
        <div className={styles.painel_direito}>

          {etapa === 'carrinho' && (
            <div className={styles.painel_conteudo}>
              <div className={styles.painel_header}>
                <h2 className={styles.painel_titulo}>Seu pedido</h2>
                <Link to="/totem" className={styles.btn_home}>
                  <Home size={16} aria-hidden="true" />
                  <span>Início</span>
                </Link>
              </div>

              {itens.length === 0 ? (
                <div className={styles.carrinho_vazio}>
                  <ShoppingBag size={52} className={styles.vazio_icone} aria-hidden="true" />
                  <p>Toque em um produto para adicionar</p>
                </div>
              ) : (
                <>
                  <ul className={styles.itens_lista}>
                    {itens.map((item) => (
                      <li key={item.idCarrinho} className={styles.item}>
                        <img src={item.imagem} alt={item.nome} className={styles.item_img} />
                        <div className={styles.item_info}>
                          <span className={styles.item_nome}>{item.nome}</span>
                          <span className={styles.item_preco}>
                            R$ {item.precoFinal.toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                        <div className={styles.item_qty}>
                          <button
                            className={styles.qty_btn}
                            onClick={() => {
                              if (item.quantidade === 1) removerItem(item.idCarrinho)
                              else atualizarQuantidade(item.idCarrinho, item.quantidade - 1)
                            }}
                          >
                            —
                          </button>
                          <span className={styles.qty_valor}>{item.quantidade}</span>
                          <button
                            className={styles.qty_btn}
                            onClick={() => atualizarQuantidade(item.idCarrinho, item.quantidade + 1)}
                          >
                            +
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>

                  <div className={styles.resumo}>
                    <div className={styles.linha}>
                      <span>Subtotal</span>
                      <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
                    </div>
                    {desconto > 0 && (
                      <div className={`${styles.linha} ${styles.linha_desconto}`}>
                        <span>Desconto</span>
                        <span>– R$ {desconto.toFixed(2).replace('.', ',')}</span>
                      </div>
                    )}
                    <div className={styles.linha}>
                      <span>Taxa de serviço</span>
                      <span>R$ 5,00</span>
                    </div>
                    <div className={`${styles.linha} ${styles.linha_total}`}>
                      <strong>Total</strong>
                      <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
                    </div>
                  </div>

                  <button className={styles.btn_primario} onClick={irParaCheckout}>
                    Ir para pagamento
                  </button>
                </>
              )}
            </div>
          )}

          {etapa === 'checkout' && (
            <div className={styles.painel_conteudo}>
              <div className={styles.painel_header}>
                <button className={styles.btn_voltar} onClick={voltarCarrinho}>
                  ← Carrinho
                </button>
                <h2 className={styles.painel_titulo}>Pagamento</h2>
              </div>

              {/* autorização de dados - LGPD */}
              <div className={styles.lgpd_section}>
                <h3 className={styles.sub_titulo}>Autorização de dados</h3>
                <label className={styles.check_label}>
                  <input
                    type="checkbox"
                    checked={aceitaTermos}
                    onChange={(e) => setAceitaTermos(e.target.checked)}
                  />
                  <span>Li e aceito a Política de Privacidade e os Termos de Uso</span>
                </label>
                <label className={styles.check_label}>
                  <input
                    type="checkbox"
                    checked={aceitaProcessamento}
                    onChange={(e) => setAceitaProcessamento(e.target.checked)}
                  />
                  <span>Autorizo o uso dos meus dados para processar este pedido</span>
                </label>
              </div>

              {/* forma de pagamento */}
              <div className={styles.metodos_section}>
                <h3 className={styles.sub_titulo}>Forma de pagamento</h3>
                <button
                  className={metodoPagamento === 'credito' ? `${styles.metodo} ${styles.metodo_ativo}` : styles.metodo}
                  onClick={() => setMetodoPagamento('credito')}
                >
                   Cartão de crédito
                </button>
                <button
                  className={metodoPagamento === 'debito' ? `${styles.metodo} ${styles.metodo_ativo}` : styles.metodo}
                  onClick={() => setMetodoPagamento('debito')}
                >
                  Cartão de débito
                </button>
                {metodoPagamento === 'debito' && (
                  <p className={styles.aviso_debito}>
                    Débito está sujeito à aprovação do banco.
                  </p>
                )}
              </div>

              <div className={`${styles.linha} ${styles.linha_total}`}>
                <strong>Total</strong>
                <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
              </div>

              <button
                className={styles.btn_primario}
                onClick={pagar}
                disabled={!aceitaTermos || !aceitaProcessamento}
              >
                Realizar pagamento
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

