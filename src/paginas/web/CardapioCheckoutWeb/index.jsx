// página principal do canal web: split view com cardápio à esquerda e carrinho à direita
import { useState } from 'react'
import { useSearchParams, useNavigate, Link } from 'react-router-dom'
import { Search, MapPin, ShoppingBag } from 'lucide-react'
import { useCarrinho, useUnidade, useUsuario } from '../../../contexto'
import { categorias, getProdutosPorUnidade, produtos } from '../../../dados'
import Badge from '../../../componentes/comuns/Badge'
import styles from './CardapioCheckoutWeb.module.css'

export default function CardapioCheckoutWeb() {
  const { unidade } = useUnidade()
  const { itens, subtotal, desconto, total, adicionarItem, atualizarQuantidade, removerItem } = useCarrinho()
  const { logado } = useUsuario()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const [busca, setBusca] = useState('')
  const [categoriaAtiva, setCategoriaAtiva] = useState('todos')
  const [metodoPagamento, setMetodoPagamento] = useState('credito')
  const [aceitaTermos, setAceitaTermos] = useState(false)
  const [aceitaProcessamento, setAceitaProcessamento] = useState(false)

  // controla o estado do painel direito via URL param (?etapa=checkout)
  const etapa = searchParams.get('etapa') || 'carrinho'

  // produtos filtrados
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

  function adicionarOuIncrementar(produto) {
    let disponivel = produto.disponivel
    if (produto.disponivelNaUnidade !== undefined) disponivel = produto.disponivelNaUnidade
    if (!disponivel) return

    const personalizacoesPadrao = {}
    produto.personalizacoes.forEach((custom) => {
      if (custom.obrigatorio && custom.opcoes.length > 0) {
        personalizacoesPadrao[custom.id] = custom.opcoes[0].id
      }
    })

    const existente = itens.find(
      (i) => i.produtoId === produto.id &&
        JSON.stringify(i.personalizacoes) === JSON.stringify(personalizacoesPadrao)
    )
    if (existente) {
      atualizarQuantidade(existente.idCarrinho, existente.quantidade + 1)
    } else {
      adicionarItem(produto, 1, personalizacoesPadrao, '')
    }
  }

  function continuar() {
    // se não tiver logado, manda pro login e volta pra cá no checkout
    if (!logado) {
      navigate('/web/login', { state: { redirect: '/web/cardapio?etapa=checkout' } })
    } else {
      setSearchParams({ etapa: 'checkout' })
    }
  }

  function voltarCarrinho() {
    setSearchParams({})
  }

  function pagar() {
    navigate('/web/pagamento', { state: { metodoPagamento } })
  }

  return (
    <div className={styles.layout}>

      {/* PAINEL ESQUERDO - cardápio */}
      <div className={styles.painel_esquerdo}>

        {/* barra da unidade */}
        <Link to="/web/unidades" className={styles.unidade_bar}>
          <MapPin size={14} aria-hidden="true" />
          <span>{unidade ? `${unidade.nome} · ${unidade.sigla}` : 'Selecionar unidade'}</span>
          <span className={styles.trocar}>Trocar</span>
        </Link>

        {/* busca */}
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

        {/* aviso sem unidade */}
        {!unidade && (
          <div className={styles.aviso}>
            <MapPin size={18} aria-hidden="true" />
            <p>
              <Link to="/web/unidades">Selecione uma unidade</Link> para ver a disponibilidade dos produtos.
            </p>
          </div>
        )}

        {/* grid de produtos */}
        {produtosFiltrados.length === 0 ? (
          <p className={styles.vazio}>Nenhum produto encontrado.</p>
        ) : (
          <div className={styles.grid}>
            {produtosFiltrados.map((produto) => {
              let disponivel = produto.disponivel
              if (produto.disponivelNaUnidade !== undefined) disponivel = produto.disponivelNaUnidade
              return (
                <article
                  key={produto.id}
                  className={disponivel ? styles.card : `${styles.card} ${styles.card_off}`}
                  onClick={() => navigate(`/web/cardapio/${produto.id}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/web/cardapio/${produto.id}`) }}
                >
                  <div className={styles.card_img_wrapper}>
                    <img src={produto.imagem} alt={produto.nome} className={styles.card_img} />
                    {(produto.sazonal || produto.exclusivo) && (
                      <div className={styles.card_badges}>
                        {produto.sazonal && <Badge tipo="sazonal">Sazonal</Badge>}
                        {produto.exclusivo && <Badge tipo="exclusivo">Exclusivo</Badge>}
                      </div>
                    )}
                  </div>
                  <div className={styles.card_body}>
                    <span className={styles.card_nome}>{produto.nome}</span>
                    <span className={styles.card_desc}>{produto.descricao}</span>
                    <div className={styles.card_rodape}>
                      <span className={styles.card_preco}>
                        {disponivel ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}` : 'Indisponível'}
                      </span>
                      <button
                        className={styles.card_btn}
                        onClick={(e) => { e.stopPropagation(); adicionarOuIncrementar(produto) }}
                        disabled={!disponivel}
                      >
                        + Adicionar
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </div>

      {/* PAINEL DIREITO - carrinho/checkout */}
      <div className={styles.painel_direito}>

        {etapa === 'carrinho' && (
          <div className={styles.painel_conteudo}>
            <h2 className={styles.painel_titulo}>Seu pedido</h2>

            {itens.length === 0 ? (
              <div className={styles.carrinho_vazio}>
                <ShoppingBag size={48} className={styles.vazio_icone} aria-hidden="true" />
                <p>Adicione itens do cardápio</p>
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
                          onClick={() => {
                            if (item.quantidade === 1) removerItem(item.idCarrinho)
                            else atualizarQuantidade(item.idCarrinho, item.quantidade - 1)
                          }}
                        >
                          -
                        </button>
                        <span>{item.quantidade}</span>
                        <button onClick={() => atualizarQuantidade(item.idCarrinho, item.quantidade + 1)}>
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

                <button className={styles.btn_primario} onClick={continuar}>
                  Continuar para o pagamento
                </button>
              </>
            )}
          </div>
        )}

        {etapa === 'checkout' && (
          <div className={styles.painel_conteudo}>
            <button className={styles.btn_voltar} onClick={voltarCarrinho}>
              ← Voltar ao carrinho
            </button>

            <h2 className={styles.painel_titulo}>Pagamento</h2>

            {/* autorização LGPD */}
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
                <span>Permito o uso dos meus dados para processamento do pedido</span>
              </label>
            </div>

            {/* método de pagamento */}
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
                  Débito está sujeito à análise do banco.
                </p>
              )}
            </div>

            {/* total */}
            <div className={`${styles.linha} ${styles.linha_total}`}>
              <strong>Total a pagar</strong>
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
  )
}
