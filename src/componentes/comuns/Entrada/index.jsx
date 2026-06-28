import styles from './Entrada.module.css'

export default function Entrada({
  label,
  tipo = 'text',
  placeholder,
  valor,
  onChange,
  erro,
  obrigatorio = false,
  id,
  multilinhas = false,
  linhas = 4,
  ...rest
}) {
  const classeEntrada = `${styles.entrada} ${erro ? styles.comErro : ''}`

  return (
    <div className={styles.grupo}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {obrigatorio && <span className={styles.obrigatorio}> *</span>}
        </label>
      )}

      {multilinhas ? (
        <textarea
          id={id}
          placeholder={placeholder}
          value={valor}
          onChange={onChange}
          rows={linhas}
          className={`${classeEntrada} ${styles.textarea}`}
          aria-invalid={erro ? 'true' : undefined}
          aria-describedby={erro ? `${id}-erro` : undefined}
          {...rest}
        />
      ) : (
        <input
          id={id}
          type={tipo}
          placeholder={placeholder}
          value={valor}
          onChange={onChange}
          className={classeEntrada}
          aria-invalid={erro ? 'true' : undefined}
          aria-describedby={erro ? `${id}-erro` : undefined}
          {...rest}
        />
      )}

      {erro && (
        <span id={`${id}-erro`} className={styles.mensagemErro} role="alert">
          {erro}
        </span>
      )}
    </div>
  )
}