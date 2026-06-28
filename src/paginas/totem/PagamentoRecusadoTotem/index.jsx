// tela de pagamento recusado no totem — sempre débito (BRD RF09)
import { useNavigate } from 'react-router-dom'
import { XCircle } from 'lucide-react'
import HeaderTotem from '../../../componentes/layout/HeaderTotem'
import styles from './PagamentoRecusadoTotem.module.css'

export default function PagamentoRecusadoTotem() {
  const navigate = useNavigate()

  function tentarComCredito() {
    // volta pro checkout com a opção de crédito
    navigate('/totem/cardapio?etapa=checkout', { replace: true })
  }

  function cancelar() {
    // o cliente desistiu, volta pra home pro próximo cliente usar o totem
    navigate('/totem', { replace: true })
  }

  return (
    <div className={styles.pagina}>
      <HeaderTotem subtitulo="Pagamento recusado" />

      <div className={styles.conteudo}>
        <XCircle size={80} className={styles.icone} aria-hidden="true" />

        <h1 className={styles.titulo}>Pagamento recusado</h1>
        <p className={styles.mensagem}>
          O pagamento com cartão de débito não foi aprovado pelo banco.
          Você pode tentar novamente com cartão de crédito.
        </p>

        <div className={styles.acoes}>
          <button className={styles.btn_credito} onClick={tentarComCredito}>
            Tentar com cartão de crédito
          </button>
          <button className={styles.btn_cancelar} onClick={cancelar}>
            Cancelar pedido
          </button>
        </div>
      </div>
    </div>
  )
}