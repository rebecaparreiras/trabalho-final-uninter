import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import Botao from '../../../componentes/comuns/Botao'
import { useCarrinho, useUnidade } from '../../../contexto'
import styles from './Checkout.module.css'

export default function Checkout() {
  const { itens, subtotal, desconto, total, totalItens } = useCarrinho()
  const { unidade } = useUnidade()
  const navigate = useNavigate()

  // cartão de crédito = aprovado / débito = recusado
  const [metodo, setMetodo] = useState('credito')

  function confirmar() {
    // passa o método pro componente de pagamento decidir o resultado
    navigate('/pagamento', { state: { metodoPagamento: metodo } })
  }

  return (
    <>
      <HeaderMobile titulo="Checkout" mostrarVoltar={true} />
      <main className={styles.main}>

        {/* resumo do pedido */}
        <section>
          <div className={styles.secao_header}>
            <h2 className={styles.secao_titulo}>RESUMO DO PEDIDO</h2>
            <button className={styles.link_editar} onClick={() => navigate('/carrinho')}>
              Editar
            </button>
          </div>

          <div className={styles.resumo_lista}>
            {itens.map((item) => (
              <div key={item.idCarrinho} className={styles.resumo_item}>
                <img src={item.imagem} alt={item.nome} className={styles.resumo_img} />
                <div className={styles.resumo_info}>
                  <span>{item.quantidade}× {item.nome}</span>
                  <span className={styles.resumo_preco}>
                    R$ {(item.precoFinal * item.quantidade).toFixed(2).replace('.', ',')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.valores}>
            <div className={styles.linha}>
              <span>Subtotal ({totalItens} {totalItens === 1 ? 'item' : 'itens'})</span>
              <span>R$ {subtotal.toFixed(2).replace('.', ',')}</span>
            </div>
            {desconto > 0 && (
              <div className={`${styles.linha} ${styles.desconto}`}>
                <span>Desconto</span>
                <span>– R$ {desconto.toFixed(2).replace('.', ',')}</span>
              </div>
            )}
            <div className={styles.linha}>
              <span>Taxa de serviço</span>
              <span>R$ 5,00</span>
            </div>
            <div className={`${styles.linha} ${styles.total}`}>
              <strong>Total</strong>
              <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
            </div>
          </div>
        </section>

        {/* retirada na loja */}
        <section>
          <h2 className={styles.secao_titulo}>RETIRSDA</h2>
          <div className={styles.card_retirada}>
            <strong>Retirada na loja</strong>
            <span>{unidade ? `${unidade.nome} · ${unidade.sigla}` : 'Unidade não selecionada'}</span>
          </div>
        </section>

        {/* escolha do método de pagamento */}
        <section>
          <h2 className={styles.secao_titulo}>PAGAMENTO</h2>
          <div className={styles.metodos}>
            <button
              className={metodo === 'credito' ? `${styles.metodo} ${styles.metodo_ativo}` : styles.metodo}
              onClick={() => setMetodo('credito')}
            >
              <span>Cartão de crédito</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
            <button
              className={metodo === 'debito' ? `${styles.metodo} ${styles.metodo_ativo}` : styles.metodo}
              onClick={() => setMetodo('debito')}
            >
              <span>Cartão de débito</span>
              <ChevronRight size={16} aria-hidden="true" />
            </button>
          </div>
          {metodo === 'debito' && (
            <p className={styles.aviso_debito}>
              Atenção: pagamentos com débito estão sujeiros à análise do banco.
            </p>
          )}
        </section>

        <Botao variante="primario" tamanho="grande" largura="cheio" onClick={confirmar}>
          Continuar para o pagamento
        </Botao>

      </main>
    </>
  )
}
