import { useState, useEffect } from 'react'
import { ShieldCheck } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import styles from './PopupLGPD.module.css'

export default function PopupLGPD({ rotaPrivacidade = '/privacidade' }) {
  const [visivel, setVisivel] = useState(true)
  const [aceitarPromos, setAceitarPromos] = useState(true)
  const { pathname } = useLocation()
  const esWeb = pathname.startsWith('/web')

  useEffect(() => {
    // const consentimento = localStorage.getItem('raizes:lgpd')
    // if (!consentimento) setVisivel(true)
  }, [])

  function salvarConsentimento(opcionais) {
    localStorage.setItem(
      'raizes:lgpd',
      JSON.stringify({ necessarios: true, opcionais, data: new Date().toISOString() })
    )
    setVisivel(false)
  }

  if (!visivel) return null

  const links = (
    <span className={styles.links_texto}>
      {' '}
      <Link to={`${rotaPrivacidade}?aba=privacidade`} className={styles.link}>Política de Privacidade</Link>
      {' | '}
      <Link to={`${rotaPrivacidade}?aba=termos`} className={styles.link}>Termos de Uso</Link>
      {' | '}
      <Link to={`${rotaPrivacidade}?aba=lgpd`} className={styles.link}>LGPD</Link>
    </span>
  )

  const checkboxes = (
    <div className={esWeb ? styles.checkboxes_web : styles.checkboxes}>
      <label className={styles.checkbox_item}>
        <input type="checkbox" checked readOnly aria-label="Cookies e dados necessários (obrigatório)" />
        <span>Cookies e dados necessários</span>
      </label>
      <label className={styles.checkbox_item}>
        <input
          type="checkbox"
          checked={aceitarPromos}
          onChange={(e) => setAceitarPromos(e.target.checked)}
          aria-label="Promoções e comunicações (opcional)"
        />
          <span>Promoções e comunicações (opcional)</span>
      </label>
    </div>
  )

  const botoes = (
    <div className={esWeb ? styles.acoes_web : styles.acoes}>
      <button
        className={esWeb ? styles.btn_recusar_web : styles.btn_recusar}
        onClick={() => salvarConsentimento(false)}
      >
        Recusar opcionais
      </button>
      <button
        className={esWeb ? styles.btn_aceitar_web : styles.btn_aceitar}
        onClick={() => salvarConsentimento(aceitarPromos)}
      >
        Aceitar e continuar
      </button>
    </div>
  )

  if (esWeb) {
    return (
      <div
        className={styles.barra_web}
        role="dialog"
        aria-modal="true"
        aria-label="Privacidade e uso de dados"
      >
        <div className={styles.web_info}>
          <ShieldCheck size={20} className={styles.icone_web} aria-hidden="true" />
          <div>
            <span className={styles.web_titulo}>Privacidade e uso de dados</span>
            <p className={styles.web_texto}>
              Usamos cookies e dados para melhorar sua experiência{links}
            </p>
          </div>
        </div>
        {checkboxes}
        {botoes}
      </div>
    )
  }

  return (
      <div className={styles.overlay}>
        <div
          className={styles.popup}
          role="dialog"
          aria-modal="true"
          aria-label="Privacidade e uso de dados"
        >
          <div className={styles.cabecalho}>
            <ShieldCheck size={22} className={styles.icone} aria-hidden="true" />
            <h2 className={styles.titulo}>Privacidade e uso de dados</h2>
          </div>

          <p className={styles.texto}>
            Usamos cookies e dados para melhorar sua experiência{links}
          </p>

          {checkboxes}
          {botoes}
        </div>
      </div>
  )
}



