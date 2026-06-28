import { Link, useNavigate } from 'react-router-dom'
import { Trash2, ShoppingBag } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import Botao from '../../../componentes/comuns/Botao'
import { useCarrinho, useUsuario } from '../../../contexto'
import styles from './Carrinho.module.css'

export default function Carrinho() {
  const { itens, subtotal, desconto, total, totalItens, atualizarQuantidade, removerItem, promocaoAtiva } = useCarrinho()
  const { logado } = useUsuario()
  const navigate = useNavigate()

  function continuar() {
    // se já tiver logado vai pra aceitar os termos, se não vai pro login
    if (logado) {
      navigate('/privacidade')
    } else {
      navigate('/login', { state: { redirect: '/privacidade' } })
    }
  }

  // carrinho vazio
  if (itens.length === 0) {
    return (
      <>
        <HeaderMobile titulo="Carrinho" mostrarVoltar={true} />
        <main className={styles.vazio}>
          <ShoppingBag size={64} className={styles.vazio_icone} aria-hidden="true" />
          <h2 className={styles.vazio_titulo}>Carrinho vazio</h2>
          <p className={styles.vazio_sub}>Adicione produtos do nosso cardápio.</p>
          <Botao variante="primario" tamanho="grande" largura="cheio" onClick={() => navigate('/cardapio')}>
            Ver cardápio
          </Botao>
        </main>
      </>
    )
  }

  return (
    <>
      <HeaderMobile titulo="Carrinho" mostrarVoltar={true} />
      <main className={styles.main}>

        <div className={styles.secao_header}>
          <h2 className={styles.secao_titulo}>ITENS DO PEDIDO</h2>
          <span className={styles.contagem}>{totalItens} {totalItens === 1 ? 'item' : 'itens'}</span>
        </div>

        {/* lista de itens do carrinho */}
        <ul className={styles.lista}>
          {itens.map((item) => (
            <li key={item.idCarrinho} className={styles.item}>
              <img src={item.imagem} alt={item.nome} className={styles.item_img} />

              <div className={styles.item_info}>
                <span className={styles.item_nome}>{item.nome}</span>
                {item.observacao && (
                  <span className={styles.item_obs}>"{item.observacao}"</span>
                )}
                <span className={styles.item_preco}>
                  R$ {item.precoFinal.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className={styles.item_acoes}>
                <button
                  className={styles.btn_remover}
                  onClick={() => removerItem(item.idCarrinho)}
                  aria-label={`Remover ${item.nome}`}
                >
                  <Trash2 size={16} aria-hidden="true" />
                </button>
                <div className={styles.qty_ctrl}>
                  <button
                    className={styles.qty_btn}
                    onClick={() => {
                      if (item.quantidade === 1) {
                        removerItem(item.idCarrinho)
                      } else {
                        atualizarQuantidade(item.idCarrinho, item.quantidade - 1)
                      }
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
              </div>
            </li>
          ))}
        </ul>

        <Link to="/cardapio" className={styles.link_adicionar}>
          + Adicionar mais itens
        </Link>

        {/* resumo de valores */}
        <div className={styles.resumo}>
          <div className={styles.linha}>
            <span>Subtotal</span>
            <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
          </div>
          {desconto > 0 && (
            <div className={`${styles.linha} ${styles.linha_desconto}`}>
              <span>Desconto ({promocaoAtiva?.titulo})</span>
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

        <Botao variante="primario" tamanho="grande" largura="cheio" onClick={continuar}>
          Continuar
        </Botao>

      </main>
    </>
  )
}