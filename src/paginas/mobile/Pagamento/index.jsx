import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import Spinner from '../../../componentes/comuns/Spinner'
import { gerarNumeroPedido, gerarHorarioPedido } from '../../../dados'
import styles from './Pagamento.module.css'

export default function Pagamento() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // lê o método que veio do checkout (crédito ou débito)
  const metodo = state?.metodoPagamento ?? 'credito'

  useEffect(() => {
    // simula 5 segundos de processamento e redireciona pro resultado
    // crédito = aprovado / débito = recusado
    const timer = setTimeout(() => {
      const numeroPedido = gerarNumeroPedido()
      const horario = gerarHorarioPedido()

      if (metodo === 'credito') {
        navigate('/pagamento/aprovado', { replace: true, state: { numeroPedido, horario } })
      } else {
        navigate('/pagamento/recusado', { replace: true })
      }
    }, 5000)

    return () => clearTimeout(timer) // limpa o timer se sair da página
  }, [metodo, navigate])

  return (
    <main className={styles.main}>
      <div className={styles.icone_container} aria-hidden="true">
        <div className={styles.anel} />
        <Lock size={36} className={styles.lock} />
      </div>

      <h1 className={styles.titulo}>Processando seu pagamento</h1>
      <p className={styles.subtitulo}>
        Seus dados são processados com segurança por meio de criptografia ponta a ponta.
      </p>

      <Spinner tamanho={40} />
      <p className={styles.aguarde}>Aguarde alguns instantes...</p>
    </main>
  )
}
