import { useNavigate } from 'react-router-dom'
import { Star, TrendingUp, Gift, ArrowRight } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import { useUsuario } from '../../../contexto'
import { dadosFidelidade } from '../../../dados'
import styles from './Fidelidade.module.css'

export default function Fidelidade() {
  const { logado, usuario } = useUsuario()
  const navigate = useNavigate()

  // todos os dados são mockados e simulam um usuário com 320 pontos no nível Prata
  const { pontos, pontosProximoNivel, nivel, beneficios } = dadosFidelidade

  const porcentagem = Math.round((pontos / pontosProximoNivel) * 100)

  // se não tiver logado, convida a entrar
  if (!logado) {
    return (
      <>
        <HeaderMobile titulo="Fidelidade" mostrarVoltar={true} />
        <main className={styles.nao_logado}>
          <Star size={64} className={styles.star_vazio} aria-hidden="true" />
          <h2 className={styles.titulo_vazio}>Acumule pontos a cada compra</h2>
          <p className={styles.sub_vazio}>
            Faça login para ver seus pontos e resgatar benefícios exclusivos.
          </p>
          <button
            className={styles.btn_login}
            onClick={() => navigate('/login', { state: { redirect: '/fidelidade' } })}
          >
            Entrar na minha conta
            <ArrowRight size={16} aria-hidden="true" />
          </button>
        </main>
      </>
    )
  }

  return (
    <>
      <HeaderMobile titulo="Fidelidade" mostrarVoltar={true} />
      <main className={styles.main}>

        {/* card de pontos com barra de progresso */}
        <div className={styles.card_pontos}>
          <div className={styles.pontos_header}>
            <div>
              <p className={styles.ola}>Olá, {usuario.nome}!</p>
              <p className={styles.nivel_texto}>Nível {nivel}</p>
            </div>
            <Star size={28} className={styles.star_card} aria-hidden="true" />
          </div>
          <div className={styles.pontos_numero}>
            <span className={styles.pontos_valor}>{pontos.toLocaleString('pt-BR')}</span>
            <span className={styles.pontos_label}>pontos</span>
          </div>
          <div
            className={styles.barra_fundo}
            role="progressbar"
            aria-valuenow={pontos}
            aria-valuemax={pontosProximoNivel}
          >
            <div className={styles.barra_progresso} style={{ width: `${porcentagem}%` }} />
          </div>
          <p className={styles.progresso_texto}>
            {(pontosProximoNivel - pontos).toLocaleString('pt-BR')} pontos para o próximo nível
          </p>
        </div>

        {/* benefícios disponíveis */}
        <section>
          <div className={styles.secao_header}>
            <Gift size={16} aria-hidden="true" />
            <h2 className={styles.secao_titulo}>BENEFÍCIOS DISPONÍVEIS</h2>
          </div>
          <ul className={styles.beneficios}>
            {beneficios.map((b) => {
              const podeResgatar = pontos >= b.pontos
              return (
                <li key={b.id} className={styles.beneficio}>
                  <div className={styles.beneficio_info}>
                    <strong>{b.titulo}</strong>
                    <span>{b.descricao}</span>
                    <span className={styles.beneficio_pontos}>{b.pontos} pts</span>
                  </div>
                  <button
                    className={podeResgatar ? styles.btn_resgatar : `${styles.btn_resgatar} ${styles.btn_bloqueado}`}
                    disabled={!podeResgatar}
                  >
                    {podeResgatar ? 'Resgatar' : `Faltam ${b.pontos - pontos}`}
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {/* regras do programa */}
        <section className={styles.como_funciona}>
          <div className={styles.secao_header}>
            <TrendingUp size={16} aria-hidden="true" />
            <h2 className={styles.secao_titulo}>COMO FUNCIONA</h2>
          </div>
          <div className={styles.regras}>
            <p>A cada R$1,00 gasto, você acumula 1 ponto.</p>
            <p>Pontos são creditados após a confirmação do pagamento.</p>
            <p>Os benefícios são resgatados automaticamente no próximo pedido.</p>
          </div>
        </section>

      </main>
    </>
  )
}