import { createContext, useContext, useEffect, useState } from 'react'
import { calcularDesconto } from '../dados/promocoes'
import { taxaServico } from '../dados/pedidos'

const CarrinhoContexto = createContext(null)

export function CarrinhoProvider({ children }) {
  const [itens, setItens] = useState(() => {
    try {
      const salvo = localStorage.getItem('raizes:carrinho')
      return salvo ? JSON.parse(salvo) : []
    } catch {
      return []
    }
  })
  const [promocaoAtiva, setPromocaoAtiva] = useState(null)

  useEffect(() => {
    localStorage.setItem('raizes:carrinho', JSON.stringify(itens))
  }, [itens])

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0)
  const subtotal = parseFloat(
    itens.reduce((acc, item) => acc + item.precoFinal * item.quantidade, 0).toFixed(2)
  )
  const desconto = calcularDesconto(promocaoAtiva, subtotal)
  const total = parseFloat((subtotal + taxaServico - desconto).toFixed(2))

  function adicionarItem(produto, quantidade, personalizacoes = {}, observacao = '') {
    const precoFinal = calcularPrecoFinal(produto, personalizacoes)
    const novoItem = {
      idCarrinho: `${produto.id}-${Date.now()}`,
      produtoId: produto.id,
      nome: produto.nome,
      preco: produto.preco,
      precoFinal,
      quantidade,
      personalizacoes,
      observacao,
      imagem: produto.imagem,
    }
    setItens((prev) => [...prev, novoItem])
  }

  function removerItem(idCarrinho) {
    setItens((prev) => prev.filter((i) => i.idCarrinho !== idCarrinho))
  }
  function atualizarQuantidade(idCarrinho, quantidade) {
    if (quantidade <= 0) {
      removerItem(idCarrinho)
      return
    }
    setItens((prev) =>
      prev.map((i) => (i.idCarrinho === idCarrinho ? { ...i, quantidade } : i))
    )
  }

  function limparCarrinho() {
    setItens([])
    setPromocaoAtiva(null)
  }

  function aplicarPromocao(promocao) {
    setPromocaoAtiva(promocao)
  }

  function removerPromocao() {
    setPromocaoAtiva(null)
  }

  return (
      <CarrinhoContexto.Provider
        value={{
          itens,
          totalItens,
          subtotal,
          desconto,
          total,
          taxaServico,
          promocaoAtiva,
          
          adicionarItem,
          removerItem,
          atualizarQuantidade,
          limparCarrinho,
          aplicarPromocao,
          removerPromocao,
        }}
      >
        {children}
      </CarrinhoContexto.Provider>
  )
}

function calcularPrecoFinal(produto, personalizacoes) {
  let preco = produto.preco
  for (const custom of produto.personalizacoes) {
    const opcaoId = personalizacoes?.[custom.id]
    if (opcaoId) {
      const opcao = custom.opcoes.find((o) => o.id === opcaoId)
      if (opcao) preco += opcao.adicional
    }
  }
  return parseFloat(preco.toFixed(2))
}

export function useCarrinho() {
  const ctx = useContext(CarrinhoContexto)
  if (!ctx) throw new Error('useCarrinho deve estar dentro de CarrinhoProvider')
  return ctx
}