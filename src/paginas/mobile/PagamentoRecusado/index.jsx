import { useNavigate, Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import Botao from '../../../componentes/comuns/Botao'
import styles from './PagamentoRecusado.module.css'

export default function PagamentoRecusado() {
  const navigate = useNavigate()

  return (
    <>
      <HeaderMobile titulo="Pagamento" mostrarVoltar={false} mostrarNotificacao={false} />
      <main className={styles.main}>

        <XCircle size={80} className={styles.icone} aria-hidden="true" />

        <h1 className={styles.titulo}>Pagamento não aprovado</h1>
        <p className={styles.subtitulo}>
          Seu cartão de débito não foi autorizado pelo banco. Verifique o limite
          disponível ou tente outro meio de pagamento.
        </p>

        <div className={styles.acoes}>
          {/* manda de volta pro checkout pra tentar de novo */}
          <Botao variante="primario" tamanho="grande" largura="cheio" onClick={() => navigate('/checkout')}>
            Tentar com outro cartão
          </Botao>
          <Botao variante="outline" tamanho="grande" largura="cheio" onClick={() => navigate('/checkout')}>
            Escolher outra forma de pagamento
          </Botao>
        </div>

        <Link to="/" className={styles.link_voltar}>Cancelar e voltar para o início</Link>

      </main>
    </>
  )
}
