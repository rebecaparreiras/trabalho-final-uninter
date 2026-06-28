import { useState } from 'react'
import { Shield } from 'lucide-react'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import { politicaPrivacidade, termosDeUso, lgpd } from '../../../dados/politicas'
import styles from './PoliticasLegais.module.css'

const DISCLAIMER = 'Texto legal simulado para fins acadêmicos. Não representa política jurídica real.'

const abas = [
  { id: 'privacidade', rotulo: 'Privacidade', politica: politicaPrivacidade },
  { id: 'termos', rotulo: 'Termos de Uso', politica: termosDeUso },
  { id: 'lgpd', rotulo: 'LGPD', politica: lgpd },
]

export default function PoliticasLegais() {
  const [abaAtiva, setAbaAtiva] = useState('privacidade')

  const atual = abas.find((a) => a.id === abaAtiva)
  const { politica } = atual

  return (
    <>
      <HeaderMobile titulo="Políticas e Termos" mostrarVoltar={true} mostrarNotificacao={false} />
      <main className={styles.main}>

        <nav className={styles.abas} aria-label="Seções de políticas">
          {abas.map((aba) => (
            <button
              key={aba.id}
              className={`${styles.aba} ${abaAtiva === aba.id ? styles.aba_ativa : ''}`}
              onClick={() => setAbaAtiva(aba.id)}
              aria-current={abaAtiva === aba.id ? 'page' : undefined}
            >
              {aba.rotulo}
            </button>
          ))}
        </nav>

        <div className={styles.disclaimer}>
          <Shield size={14} aria-hidden="true" />
          <p>{DISCLAIMER}</p>
        </div>

        <article className={styles.conteudo}>
          <h1 className={styles.titulo_politica}>{politica.titulo}</h1>
          {politica.empresa && (
            <p className={styles.empresa}>{politica.empresa}</p>
          )}

          {politica.secoes.map((secao) => (
            <section key={secao.titulo} className={styles.secao}>
              <h2 className={styles.secao_titulo}>{secao.titulo}</h2>
              {secao.paragrafos.map((paragrafo, i) => (
                <p key={i} className={styles.paragrafo}>{paragrafo}</p>
              ))}
            </section>
          ))}
        </article>

      </main>
    </>
  )
}