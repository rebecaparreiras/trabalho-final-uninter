import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell } from 'lucide-react'
import styles from './HeaderMobile.module.css'

export default function HeaderMobile({
  titulo,
  mostrarVoltar = false,
  mostrarNotificacao = true,
}) {
  const navigate = useNavigate()

  return (
    <header className={styles.header}>
      <div className={styles.esquerda}>
        {mostrarVoltar ? (
          <button
            onClick={() => navigate(-1)}
            className={styles.botao_icone}
            aria-label="Voltar"
          >
            <ArrowLeft size={24} aria-hidden="true" />
          </button>
        ) : (
          <img src={`${import.meta.env.BASE_URL}img/logo.png`} alt="Raízes do Nordeste" className={styles.avatar} />
        )}
      </div>

      <h1 className={styles.titulo}>{titulo ?? 'Raízes do Nordeste'}</h1>

      <div className={styles.direita}>
        {mostrarNotificacao && (
          <button className={styles.botao_icone} aria-label="Notificações">
            <Bell size={22} aria-hidden="true" />
          </button>
        )}
      </div>
    </header>
  )
}