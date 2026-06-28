import { Link } from 'react-router-dom'
import { Star, Gift, Shield, Award, TrendingUp } from 'lucide-react'
import { useUsuario } from '../../../contexto'
import { dadosFidelidade } from '../../../dados'
import styles from './FidelidadeWeb.module.css'

export default function FidelidadeWeb() {
  const { logado, usuario } = useUsuario()

  // tela de convite quando não está logado
  if (!logado) {
    return (
      <div className={styles.pagina}>
        <div className={styles.convite}>
          <Star size={56} className={styles.star_icone} aria-hidden="true" />
          <h1 className={styles.titulo}>Programa de Fidelidade</h1>
          <p className={styles.convite_desc}>
            Acumule pontos a cada pedido e troque por recompensas exclusivas.
            Faça login para ver seus pontos e benefícios.
          </p>
          <div className={styles.beneficios_preview}>
            <div className={styles.benefit_item}>
              <Gift size={20} aria-hidden="true" />
              <span>Pontos que viram desconto</span>
            </div>
            <div className={styles.benefit_item}>
              <Award size={20} aria-hidden="true" />
              <span>Níveis com benefícios exclusivos</span>
            </div>
            <div className={styles.benefit_item}>
              <Shield size={20} aria-hidden="true" />
              <span>Dados protegidos pela LGPD</span>
            </div>
          </div>
          <Link to="/web/login" className={styles.btn_login}>
            Entrar e ver meus pontos
          </Link>
        </div>
      </div>
    )
  }

  // dados mockados simulando usuário com 320 pontos no nível prata
  const { pontos, nivel, pontosProximoNivel, beneficios } = dadosFidelidade

  // calcula a porcentagem de progresso pro próximo nível
  const porcentagem = Math.round((pontos / pontosProximoNivel) * 100)

  return (
    <div className={styles.pagina}>
      <div className={styles.conteudo}>

        <h1 className={styles.titulo_pagina}>Seu programa de fidelidade</h1>

        {/* card de pontos + como funciona */}
        <div className={styles.grid_top}>

          {/* card de pontos */}
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
            <div className={styles.barra_wrapper}>
              <div className={styles.barra_fundo}>
                <div
                  className={styles.barra_progresso}
                  style={{ width: `${porcentagem}%` }}
                />
              </div>
              <p className={styles.barra_desc}>
                Faltam {pontosProximoNivel - pontos} pontos para o nível Ouro
              </p>
            </div>
          </div>

          {/* como funciona */}
          <div className={styles.secao_card}>
            <div className={styles.secao_header}>
              <TrendingUp size={16} aria-hidden="true" />
              <h2 className={styles.secao_titulo}>COMO FUNCIONA</h2>
            </div>
            <div className={styles.regras}>
              <p>A cada R$1,00 gasto, você acumula 1 ponto.</p>
              <p>Pontos são creditados após a confirmação do pagamento.</p>
              <p>Os benefícios são resgatados automaticamente no próximo pedido.</p>
            </div>
          </div>

        </div>

        {/* benefícios disponíveis */}
        <div className={styles.secao_card}>
          <h2 className={styles.secao_titulo}>Benefícios disponíveis</h2>
          <ul className={styles.beneficios_lista}>
            {beneficios.map((b) => (
              <li key={b.id} className={styles.beneficio_item}>
                <Gift size={18} className={styles.beneficio_icone} aria-hidden="true" />
                <div>
                  <strong className={styles.beneficio_nome}>{b.titulo}</strong>
                  <span className={styles.beneficio_desc}>{b.descricao} · {b.pontos} pts</span>
                </div>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  )
}