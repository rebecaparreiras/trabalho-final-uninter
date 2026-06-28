export const taxaServico = 5.00

export const etapasPedido = [
  { id: 'recebido', label: 'Pedido recebido' },
  { id: 'em_preparo', label: 'Em preparo' },
  { id: 'pronto', label: 'Pronto para retirada' },
]

// status mockado sempre em_preparo
export const statusAtualMock = 'em_preparo'

// tempo estimado exibido no totem
export const tempoEstimadoTotem = '10-15 min'

export function gerarNumeroPedido() {
  return `#${Math.floor(10000 + Math.random() * 90000)}`
}

export function gerarHorarioPedido() {
  const agora = new Date()
  return agora.toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}