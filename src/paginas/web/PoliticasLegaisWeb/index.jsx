import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { politicaPrivacidade, termosDeUso, lgpd } from '../../../dados/politicas'
import styles from './PoliticasLegaisWeb.module.css'

const DISCLAIMER = 'Texto original retirado do site oficial da Domino\'s Pizzaria. Não condiz com o desenvolvimento do trabalho e possui caráter educativo apenas.'

const abas = [
  { id: 'privacidade', rotulo: 'Política de Privacidade', politica: politicaPrivacidade },
  { id: 'termos', rotulo: 'Termos de Uso', politica: termosDeUso },
  { id: 'lgpd', rotulo: 'LGPD', politica: lgpd },
]

const IDS_VALIDOS = abas.map((a) => a.id)

export default function PoliticasLegaisWeb() {
  const [searchParams, setSearchParams] = useSearchParams()
  const abaParam = searchParams.get('aba')
  const abaAtiva = IDS_VALIDOS.includes(abaParam) ? abaParam : 'privacidade'

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [abaAtiva])

  function trocarAba(id) {
    setSearchParams({ aba: id }, { replace: true })
  }

  const atual = abas.find((a) => a.id === abaAtiva)
  const { politica } = atual

  return (
    <div className={styles.pagina}>
      <div className={styles.inner}>

        <nav className={styles.abas} aria-label="Seções de políticas">
          {abas.map((aba) => (
            <button
              key={aba.id}
              className={`${styles.aba} ${abaAtiva === aba.id ? styles.aba_ativa : ''}`}
              onClick={() => trocarAba(aba.id)}
              aria-current={abaAtiva === aba.id ? 'page' : undefined}
            >
              {aba.rotulo}
            </button>
          ))}
        </nav>

        <div className={styles.disclaimer}>
          <Shield size={16} aria-hidden="true" />
          <p>{DISCLAIMER}</p>
        </div>

        <article className={styles.conteudo}>
          <h1 className={styles.titulo_politica}>{politica.titulo}</h1>
          {politica.empresa && (
            <p className={styles.empresa}>{politica.empresa}</p>
          )}

          <div className={styles.secoes}>
            {politica.secoes.map((secao) => (
              <section key={secao.titulo} className={styles.secao}>
                <h2 className={styles.secao_titulo}>{secao.titulo}</h2>
                {secao.paragrafos.map((paragrafo, i) => (
                  <p key={i} className={styles.paragrafo}>{paragrafo}</p>
                ))}
              </section>
            ))}
          </div>
        </article>

      </div>
    </div>
  )
}
