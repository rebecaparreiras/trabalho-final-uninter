import { useState, useEffect } from 'react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
import HeaderMobile from '../../../componentes/layout/HeaderMobile'
import { useCarrinho, useUnidade } from '../../../contexto'
import { getProdutoPorId } from '../../../dados'
import Badge from '../../../componentes/comuns/Badge'
import styles from './DetalhesProduto.module.css'

export default function DetalhesProduto() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const rotaCardapio = pathname.startsWith('/totem') ? '/totem/cardapio'
    : pathname.startsWith('/web') ? '/web/cardapio'
    : '/cardapio'

  const esWeb = pathname.startsWith('/web')

  const { adicionarItem } = useCarrinho()
  const { unidade } = useUnidade()

  const produto = getProdutoPorId(id)

  const [quantidade, setQuantidade] = useState(1)
  const [personalizacoes, setPersonalizacoes] = useState({})
  const [observacao, setObservacao] = useState('')

  // pré-seleciona a primeira opção de cada personalização obrigatória
  useEffect(() => {
    if (!produto) return
    const iniciais = {}
    produto.personalizacoes.forEach((custom) => {
      if (custom.obrigatorio && custom.opcoes.length > 0) {
        iniciais[custom.id] = custom.opcoes[0].id
      }
    })
    setPersonalizacoes(iniciais)
  }, [produto?.id])

  if (!produto) {
    return (
      <>
        <HeaderMobile titulo="Produto" mostrarVoltar={true} />
        <main className={styles.nao_encontrado}>Produto não encontrado.</main>
      </>
    )
  }

  // verifica se o produto tá disponível na unidade selecionada
  let disponivel = produto.disponivel
  if (unidade) {
    if (produto.unidadesDisponiveis !== 'todas') {
      disponivel = produto.disponivel && produto.unidadesDisponiveis.includes(unidade.id)
    }
  }

  // calcula o adicional das personalizações selecionadas
  let adicional = 0
  produto.personalizacoes.forEach((custom) => {
    const opcaoId = personalizacoes[custom.id]
    if (opcaoId) {
      const opcao = custom.opcoes.find((o) => o.id === opcaoId)
      if (opcao) adicional += opcao.adicional
    }
  })

  const precoUnitario = produto.preco + adicional
  const precoTotal = precoUnitario * quantidade

  function selecionarOpcao(customId, opcaoId) {
    setPersonalizacoes({ ...personalizacoes, [customId]: opcaoId })
  }

  function adicionar() {
    adicionarItem(produto, quantidade, personalizacoes, observacao)
    navigate(rotaCardapio)
  }

  return (
    <div className={esWeb ? `${styles.pagina} ${styles.pagina_web}` : styles.pagina}>
      {!esWeb && <HeaderMobile titulo="Detalhe do produto" mostrarVoltar={true} />}

      <img src={produto.imagem} alt={produto.nome} className={esWeb ? `${styles.imagem} ${styles.imagem_web}` : styles.imagem} />

      <div className={styles.conteudo}>
        {(produto.sazonal || produto.exclusivo) && (
          <div className={styles.badges}>
            {produto.sazonal && <Badge tipo="sazonal">Sazonal</Badge>}
            {produto.exclusivo && <Badge tipo="exclusivo">Exclusivo</Badge>}
          </div>
        )}
        <h1 className={styles.nome}>{produto.nome}</h1>
        <p className={styles.descricao}>{produto.descricao}</p>
        <p className={styles.preco_base}>R$ {produto.preco.toFixed(2).replace('.', ',')}</p>

        {/* personalizações (ex: tamanho, tipo) */}
        {produto.personalizacoes.map((custom) => (
          <div key={custom.id} className={styles.customizacao}>
            <h2 className={styles.custom_titulo}>
              {custom.nome}
              {custom.obrigatorio && <span className={styles.obrigatorio}> · obrigatório</span>}
            </h2>
            <div className={styles.opcoes}>
              {custom.opcoes.map((opcao) => {
                const ativa = personalizacoes[custom.id] === opcao.id
                return (
                  <button
                    key={opcao.id}
                    className={ativa ? `${styles.opcao} ${styles.opcao_ativa}` : styles.opcao}
                    onClick={() => selecionarOpcao(custom.id, opcao.id)}
                  >
                    <span>{opcao.label}</span>
                    <span className={styles.opcao_preco}>
                      {opcao.adicional === 0
                        ? `R$ ${produto.preco.toFixed(2).replace('.', ',')}`
                        : `+ R$ ${opcao.adicional.toFixed(2).replace('.', ',')}`
                      }
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
        ))}

        {/* campo de observação com contador de caracteres */}
        <div className={styles.obs_section}>
          <label htmlFor="obs" className={styles.obs_label}>Observação (opcional)</label>
          <textarea
            id="obs"
            className={styles.obs_textarea}
            placeholder="Ex: sem sal, sem pimenta..."
            value={observacao}
            onChange={(e) => setObservacao(e.target.value.slice(0, 120))}
            rows={3}
          />
          <span className={styles.contador}>{observacao.length}/120</span>
        </div>
      </div>

      {/* barra fixa no rodapé com controle de quantidade e botão adicionar */}
      <div className={esWeb ? `${styles.barra} ${styles.barra_web}` : styles.barra}>
        <div className={styles.qty_ctrl}>
          <button
            className={styles.qty_btn}
            onClick={() => setQuantidade(quantidade > 1 ? quantidade - 1 : 1)}
          >
            —
          </button>
          <span className={styles.qty_valor}>{quantidade}</span>
          <button
            className={styles.qty_btn}
            onClick={() => setQuantidade(quantidade + 1)}
          >
            +
          </button>
        </div>
        <button
          className={styles.btn_adicionar}
          onClick={adicionar}
          disabled={!disponivel}
        >
          {disponivel
            ? `Adicionar R$ ${precoTotal.toFixed(2).replace('.', ',')}`
            : 'Indisponível nesta unidade'
          }
        </button>
      </div>
    </div>
  )
}
