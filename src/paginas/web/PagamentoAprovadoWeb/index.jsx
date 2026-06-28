import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import Botao from '../../../componentes/comuns/Botao'
import { gerarNumeroPedido, gerarHorarioPedido } from '../../../dados'
import styles from './PagamentoAprovadoWeb.module.css'

export default function PagamentoAprovadoWeb() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const numeroPedido = state?.numeroPedido ?? gerarNumeroPedido()
  const horario = state?.horario ?? gerarHorarioPedido()

  return (
    <main className={styles.main}>

      <CheckCircle2 size={80} className={styles.icone} aria-hidden="true" />

      <h1 className={styles.titulo}>Pagamento aprovado!</h1>
      <p className={styles.subtitulo}>Seu pedido foi recebido com sucesso.</p>

      <div className={styles.card_pedido}>
        <div className={styles.linha_info}>
          <span className={styles.label}>Número do pedido</span>
          <strong>{numeroPedido}</strong>
        </div>
        <div className={styles.divisor} />
        <div className={styles.linha_info}>
          <span className={styles.label}>Data e hora</span>
          <strong>{horario}</strong>
        </div>
      </div>

      <Botao
        variante="primario"
        tamanho="grande"
        largura="cheio"
        onClick={() => navigate('/web/pedido', { state: { numeroPedido, horario } })}
      >
        Acompanhar pedido
      </Botao>

      <Link to="/web" className={styles.link_voltar}>Voltar para o início</Link>

    </main>
  )
}