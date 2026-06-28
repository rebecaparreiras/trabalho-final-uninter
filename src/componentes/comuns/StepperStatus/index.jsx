import { Check } from 'lucide-react'
import { etapasPedido, statusAtualMock } from '../../../dados/pedidos'
import styles from './StepperStatus.module.css'

export default function StepperStatus({ statusAtual = statusAtualMock, horarios = {} }) {
  const indexAtual = etapasPedido.findIndex((e) => e.id === statusAtual)

  return (
    <ol className={styles.stepper} aria-label="Status do pedido">
      {etapasPedido.map((etapa, index) => {
        const concluida = index <= indexAtual
        const penultima = index < etapasPedido.length - 1

        return (
          <li key={etapa.id} className={styles.etapa}>
            <div className={styles.coluna_visual}>
                <div
                  className={`${styles.circulo} ${concluida ? styles.concluido : ''}`}
                  aria-hidden="true"
                >
                  {concluida && <Check size={14} strokeWidth={3} />}
                </div>
                {penultima && (
                  <div className={`${styles.linha} ${index < indexAtual ? styles.linha_concluida : ''}`} />
                )}
            </div>

            <div className={styles.coluna_info}>
              <span className={`${styles.label} ${concluida ? styles.label_ativo : ''}`}>
                {etapa.label}
              </span>
              {horarios[etapa.id] && (
                <span className={styles.horario}>{horarios[etapa.id]}</span>
              )}
            </div>
          </li>
        )
      })}
    </ol>
  )
}