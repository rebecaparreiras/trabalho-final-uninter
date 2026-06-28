import styles from './Botao.module.css'

export default function Botao({
  children,
  variante = 'primario',
  tamanho = 'medio',
  largura = 'auto',
  disabled = false,
  tipo = 'button',
  onClick,
  className = '',
}) {
  const classes = [
    styles.botao,
    styles[variante],
    styles[tamanho],
    largura === 'cheio' ? styles.cheio : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <button type={tipo} disabled={disabled} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}