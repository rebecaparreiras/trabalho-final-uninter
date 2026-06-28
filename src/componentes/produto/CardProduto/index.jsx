import { useNavigate } from 'react-router-dom'
import Badge from '../../comuns/Badge'
import styles from './CardProduto.module.css'

export default function CardProduto({ produto, rota, rotaExata = false, aoAdicionarDireto }) {
  const navigate = useNavigate()

  // verifica disponibilidade (pode vir da unidade ou do produto direto)
  let disponivel = produto.disponivel
  if (produto.disponivelNaUnidade !== undefined) {
    disponivel = produto.disponivelNaUnidade
  }

  const caminho = rota ? rota : '/cardapio'

  function navegar(e) {
    e.preventDefault()
    navigate(rotaExata ? caminho : caminho + '/' + produto.id)
  }

  function clicarBotao(e) {
    e.stopPropagation()
    if (aoAdicionarDireto) {
      aoAdicionarDireto(produto)
    } else {
      navegar(e)
    }
  }

  return (
    <article
      className={disponivel ? styles.card : `${styles.card} ${styles.indisponivel}`}
      onClick={navegar}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') navegar(e) }}
      
    >
      <div className={styles.imagem_wrapper}>
        <img
          src={produto.imagem}
          alt={produto.nome}
          className={styles.imagem}
          loading="lazy"
        />
        {(produto.sazonal || produto.exclusivo) && (
          <div className={styles.badges}>
            {produto.sazonal && <Badge tipo="sazonal">Sazonal</Badge>}
            {produto.exclusivo && <Badge tipo="exclusivo">Exclusivo</Badge>}
          </div>
        )}
      </div>

      <div className={styles.info}>
        <span className={styles.nome}>{produto.nome}</span>
        <span className={styles.descricao}>{produto.descricao}</span>

        {disponivel
          ? <span className={styles.preco}>R$ {produto.preco.toFixed(2).replace('.', ',')}</span>
          : <span className={styles.tag_indisponivel}>Indisponível</span>
        }

        <button
          className={disponivel ? styles.btn : `${styles.btn} ${styles.btn_off}`}
          disabled={!disponivel}
          onClick={clicarBotao}
          tabIndex={-1}
          aria-hidden="true"
        >
          + Adicionar
        </button>
      </div>
    </article>
  )
}