import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { gerarNumeroPedido, gerarHorarioPedido } from '../../../dados'
import Spinner from '../../../componentes/comuns/Spinner'
import styles from './PagamentoWeb.module.css'

export default function PagamentoWeb() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const metodo = state?.metodoPagamento || 'credito'

  useEffect(() => {
    // simula 5 segundos de processamento antes de mostrar o resultado
    const timer = setTimeout(() => {
      if (metodo === 'credito') {
        const numeroPedido = gerarNumeroPedido()
        const horario = gerarHorarioPedido()
        navigate('/web/pagamento/aprovado', {
          replace: true,
          state: { numeroPedido, horario },
        })
      } else {
        // débito é sempre recusado
        navigate('/web/pagamento/recusado', { replace: true })
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [metodo, navigate])

  return (
    <div className={styles.pagina}>
      <div className={styles.card}>
        <div className={styles.icone_wrapper}>
          <Lock size={40} className={styles.icone} aria-hidden="true" />
        </div>
        <h1 className={styles.titulo}>Processando pagamento</h1>
        <p className={styles.subtitulo}>
          Aguarde, estamos processando sua transação com segurança.
        </p>
        <Spinner />
        <p className={styles.aviso}>Não feche ou atualize a página.</p>
      </div>
    </div>
  )
}