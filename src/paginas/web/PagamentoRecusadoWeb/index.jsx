import { useNavigate, Link } from 'react-router-dom'
import { XCircle } from 'lucide-react'
import Botao from '../../../componentes/comuns/Botao'
import styles from './PagamentoRecusadoWeb.module.css'

export default function PagamentoRecusadoWeb() {
  const navigate = useNavigate()

  return (
    <main className={styles.main}>

      <XCircle size={80} className={styles.icone} aria-hidden="true" />

      <h1 className={styles.titulo}>Pagamento não aprovado</h1>
      <p className={styles.subtitulo}>
        Seu cartão de débito não foi autorizado pelo banco. Verifique o limite
        disponível ou tente outro meio de pagamento.
      </p>

      <div className={styles.acoes}>
        <Botao variante="primario" tamanho="grande" largura="cheio" onClick={() => navigate('/web/cardapio?etapa=checkout')}>
          Tentar com outro cartão
        </Botao>
        <Botao variante="outline" tamanho="grande" largura="cheio" onClick={() => navigate('/web/cardapio?etapa=checkout')}>
          Escolher outra forma de pagamento
        </Botao>
      </div>

      <Link to="/web" className={styles.link_voltar}>Cancelar e voltar para o início</Link>

    </main>
  )
}