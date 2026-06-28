export function formatarPreco(valor) {
  return `R$ ${Number(valor).toFixed(2).replace('.', ',')}`
}

export function formatarPontos(pontos) {
  return pontos.toLocaleString('pt-BR')
}