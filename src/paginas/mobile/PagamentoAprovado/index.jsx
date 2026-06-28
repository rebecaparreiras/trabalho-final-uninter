import { useLocation, useNavigate, Link } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import Botao from '../../../componentes/comuns/Botao'
import { gerarNumeroPedido, gerarHorarioPedido } from '../../../dados'
import styles from './PagamentoAprovado.module.css'

export default function PagamentoAprovado() {
  const { state } = useLocation()
  const navigate = useNavigate()

  // usa os dados que vieram do pagamento ou gera novos se acessar direto
  const numeroPedido = state?.numeroPedido ?? gerarNumeroPedido()
  const horario = state?.horario ?? gerarHorarioPedido()

  return (
    <>
      <HeaderMobile titulo="Pagamento" mostrarVoltar={false} mostrarNotificacao={false} />
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
          onClick={() => navigate('/pedido', { state: { numeroPedido, horario } })}
        >
           Acompanhar pedido
        </Botao>

        <Link to="/" className={styles.link_voltar}>Voltar para o início</Link>

      </main>
    </>
  )
}