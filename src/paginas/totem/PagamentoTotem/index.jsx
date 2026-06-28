// tela de processamento de pagamento do totem - mesma lógica do mobile/web
import { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { gerarNumeroPedido, gerarHorarioPedido } from '../../../dados'
import Spinner from '../../../componentes/comuns/Spinner'
import HeaderTotem from '../../../componentes/layout/HeaderTotem'
import styles from './PagamentoTotem.module.css'

export default function PagamentoTotem() {
  const navigate = useNavigate()
  const { state } = useLocation()

  const metodo = state?.metodoPagamento || 'credito'

  useEffect(() => {
    // 5 segundos de processamento, depois redireciona pro resultado
    const timer = setTimeout(() => {
      if (metodo === 'credito') {
        const numeroPedido = gerarNumeroPedido()
        const horario = gerarHorarioPedido()
        navigate('/totem/pagamento/aprovado', {
          replace: true,
          state: { numeroPedido, horario },
        })
      } else {
        // débito sempre recusado
        navigate('/totem/pagamento/recusado', { replace: true })
      }
    }, 5000)

    return () => clearTimeout(timer)
  }, [metodo, navigate])

  return (
    <div className={styles.pagina}>
      <HeaderTotem subtitulo="Processando pagamento" />
      <div className={styles.conteudo}>
        <div className={styles.icone_wrapper}>
          <Lock size={48} className={styles.icone} aria-hidden="true" />
        </div>
        <h1 className={styles.titulo}>Processando seu pagamento</h1>
        <p className={styles.subtitulo}>
          Aguarde enquanto processamos sua transação com segurança.
        </p>
        <Spinner />
        <p className={styles.aviso}>Não remova o cartão da máquina.</p>
      </div>
    </div>
  )
}