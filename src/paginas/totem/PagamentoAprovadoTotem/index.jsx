// tela final de pagamento aprovado no totem
// essa é a tela que o cliente vê depois de pagar — mostra o número e o tempo estimado
import { useLocation, useNavigate } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { gerarNumeroPedido, gerarHorarioPedido, tempoEstimadoTotem } from '../../../dados'
import HeaderTotem from '../../../componentes/layout/HeaderTotem'
import { useCarrinho } from '../../../contexto'
import styles from './PagamentoAprovadoTotem.module.css'

export default function PagamentoAprovadoTotem() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const { limparCarrinho } = useCarrinho()

  const numeroPedido = state?.numeroPedido || gerarNumeroPedido()
  const horario = state?.horario || gerarHorarioPedido()

  function novoCliente() {
    // limpa o carrinho e volta pra home - próximo cliente pode usar
    limparCarrinho()
    navigate('/totem', { replace: true })
  }

  return (
    <div className={styles.pagina}>
      <HeaderTotem subtitulo="Pedido confirmado" />

      <div className={styles.conteudo}>
        <CheckCircle2 size={80} className={styles.icone} aria-hidden="true" />

        <h1 className={styles.titulo}>Pagamento aprovado!</h1>
        <p className={styles.subtitulo}>Seu pedido foi confirmado com sucesso.</p>

        {/* número do pedido - destaque grande */}
        <div className={styles.numero_card}>
          <span className={styles.numero_label}>Número do seu pedido</span>
          <strong className={styles.numero_valor}>{numeroPedido}</strong>
          <span className={styles.numero_horario}>Realizado às {horario}</span>
        </div>

        {/* tempo estimado */}
        <div className={styles.tempo_card}>
          <span className={styles.tempo_label}>Tempo estimado</span>
          <strong className={styles.tempo_valor}>{tempoEstimadoTotem}</strong>
          <span className={styles.tempo_instrucao}>
            Retire seu pedido diretamente no balcão quando chamarmos o número acima.
          </span>
        </div>

        <button className={styles.btn_novo} onClick={novoCliente}>
          Novo pedido
        </button>
      </div>
    </div>
  )
}

