import { useLocation, Link, useNavigate } from 'react-router-dom'
import { MapPin, Package, ChefHat, CheckCircle2 } from 'lucide-react'
import { useCarrinho, useUnidade } from '../../../contexto'
import { gerarNumeroPedido, gerarHorarioPedido } from '../../../dados'
import styles from './StatusPedidoWeb.module.css'

// status do pedido no momento mockado como em_preparo
const statusAtualMock = 'em_preparo'

const passos = [
  { id: 'recebido', icone: Package, rotulo: 'Pedido recebido' },
  { id: 'em_preparo', icone: ChefHat, rotulo: 'Em preparo' },
  { id: 'pronto', icone: CheckCircle2, rotulo: 'Pronto para retirada' },
]

export default function StatusPedidoWeb() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { itens, total, limparCarrinho } = useCarrinho()
  const { unidade } = useUnidade()

  const numeroPedido = state?.numeroPedido || gerarNumeroPedido()
  const horario = state?.horario || gerarHorarioPedido()

  // descobre qual passo está ativo e quais já passaram
  const indexAtual = passos.findIndex((p) => p.id === statusAtualMock)

  function entendido() {
    limparCarrinho()
    navigate('/web')
  }

  return (
    <div className={styles.pagina}>
      <div className={styles.conteudo}>

        {/* número do pedido */}
        <div className={styles.numero_card}>
          <span className={styles.numero_label}>Pedido</span>
          <strong className={styles.numero_valor}>{numeroPedido}</strong>
          <span className={styles.numero_horario}>Realizado às {horario}</span>
        </div>

        {/* stepper de status */}
        <div className={styles.stepper_card}>
          <h2 className={styles.secao_titulo}>Status do pedido</h2>
          <div className={styles.stepper}>
            {passos.map((passo, index) => {
              const Icone = passo.icone
              const ativo = passo.id === statusAtualMock
              const concluido = index < indexAtual

              let classeItem = styles.passo
              if (ativo) classeItem = `${styles.passo} ${styles.passo_ativo}`
              if (concluido) classeItem = `${styles.passo} ${styles.passo_concluido}`

              return (
                <div key={passo.id} className={classeItem}>
                  {/* linha conectora */}
                  {index > 0 && (
                    <div className={index <= indexAtual ? `${styles.linha} ${styles.linha_ativa}` : styles.linha} />
                  )}
                  <div className={styles.passo_bolinha}>
                    <Icone size={18} aria-hidden="true" />
                  </div>
                  <span className={styles.passo_rotulo}>{passo.rotulo}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* unidade de retirada */}
        {unidade && (
          <div className={styles.unidade_card}>
            <MapPin size={20} className={styles.pin} aria-hidden="true" />
            <div>
              <strong className={styles.unidade_nome}>{unidade.nome}</strong>
              <span className={styles.unidade_end}>{unidade.endereco}</span>
            </div>
          </div>
        )}

        {/* resumo dos itens */}
        {itens.length > 0 && (
          <div className={styles.itens_card}>
            <h2 className={styles.secao_titulo}>Itens do pedido</h2>
            <ul className={styles.itens_lista}>
              {itens.map((item) => (
                <li key={item.idCarrinho} className={styles.item}>
                  <img src={item.imagem} alt={item.nome} className={styles.item_img} />
                  <span className={styles.item_nome}>
                    {item.quantidade}× {item.nome}
                  </span>
                  <span className={styles.item_preco}>
                    R$ {(item.precoFinal * item.quantidade).toFixed(2).replace('.', ',')}
                  </span>
                </li>
              ))}
            </ul>
            <div className={styles.total_linha}>
                <strong>Total</strong>
                <strong>R$ {total.toFixed(2).replace('.', ',')}</strong>
            </div>
          </div>
        )}

        <button className={styles.btn_entendido} onClick={entendido}>
          Entendido, voltar para a home
        </button>

      </div>
    </div>
  )
}