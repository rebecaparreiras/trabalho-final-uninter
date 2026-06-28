import { useLocation, useNavigate } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import StepperStatus from '../../../componentes/comuns/StepperStatus'
import Botao from '../../../componentes/comuns/Botao'
import { useCarrinho, useUnidade } from '../../../contexto'
import { statusAtualMock, gerarNumeroPedido, gerarHorarioPedido } from '../../../dados'
import styles from './AcompanharPedido.module.css'

export default function AcompanharPedido() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { itens, total, limparCarrinho } = useCarrinho()
  const { unidade } = useUnidade()

  // usa os dados que vieram do pagamento aprovado
  const numeroPedido = state?.numeroPedido ?? gerarNumeroPedido()
  const horario = state?.horario ?? gerarHorarioPedido()

  // status mockado sempre em preparo (analisar)
  const horarios = { recebido: horario, em_preparo: horario }

  function entendido() {
    // limpa o carrinho e volta pra home
    limparCarrinho()
    navigate('/')
  }

  return (
    <>
      <HeaderMobile titulo="Meu pedido" mostrarVoltar={false} />
      <main className={styles.main}>

        {/* card com número e horário do pedido */}
        <div className={styles.card_numero}>
          <span className={styles.numero_label}>Número do pedido</span>
          <strong className={styles.numero}>{numeroPedido}</strong>
          <span className={styles.horario}>{horario}</span>
        </div>

        {/* stepper de status */}
        <section>
          <h2 className={styles.secao_titulo}>STATUS DO PEDIDO</h2>
          <div className={styles.stepper_wrapper}>
            <StepperStatus statusAtual={statusAtualMock} horarios={horarios} />
          </div>
        </section>

        {/* unidade de retirada */}
        <div className={styles.card_retirada}>
          <MapPin size={18} className={styles.pin} aria-hidden="true" />
          <div>
            <strong>Retire em</strong>
            <span>{unidade ? `${unidade.nome} · ${unidade.sigla}` : 'Sua unidade'}</span>
          </div>
        </div>

        {/* itens do pedido */}
        {itens.length > 0 && (
          <section>
            <h2 className={styles.secao_titulo}>ITENS DO PEDIDO</h2>
            <ul className={styles.lista}>
              {itens.map((item) => (
                <li key={item.idCarrinho} className={styles.item}>
                  <img src={item.imagem} alt={item.nome} className={styles.item_img} />
                  <div className={styles.item_info}>
                    <span>{item.quantidade}× {item.nome}</span>
                    <span className={styles.item_preco}>
                      R$ {(item.precoFinal * item.quantidade).toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className={styles.total}>
              <span>Total pago</span>
              <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
            </div>
          </section>
        )}

        <Botao variante="primario" tamanho="grande" largura="cheio" onClick={entendido}>
          Entendido
        </Botao>

      </main>
    </>
  )
}