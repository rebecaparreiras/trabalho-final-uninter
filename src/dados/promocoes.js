// tipo valor_fixo aplica desconto fixo
// percentual aplica desconto percentual sobre o subtotal
export const promocoes = [
  {
    id: 'promo-cafe-tapioca',
    titulo: 'Combo Café & Tapioca',
    descricao: 'Peça qualquer café + tapioca e ganhe R$5 de desconto.',
    tipo: 'valor_fixo',
    desconto: 5.00,
    badge: '-R$5,00',
    validade: '2026-08-31',
    imagem: '/img/cafe-tapioca.webp',
    ativa: true,
  },
  {
    id: 'promo-combo-nordestino',
    titulo: 'Combo Nordestino',
    descricao: 'Cuscuz + Suco de Laranja com R$5 de desconto.',
    tipo: 'valor_fixo',
    desconto: 5.00,
    badge: 'Combo',
    validade: '2026-07-31',
    imagem: '/img/combo.webp',
    ativa: true,
  },
  {
    id: 'promo-primeira-compra',
    titulo: 'Primeira Compra',
    descricao: '10% de desconto na sua primeira compra pelo app.',
    tipo: 'percentual',
    percentual: 10,
    badge: '10% off',
    validade: '2026-12-31',
    imagem: '/img/primeira-compra.jpeg',
    ativa: true,
  },
]


export function calcularDesconto(promocao, subtotal) {
  if (!promocao) return 0
  if (promocao.tipo === 'valor_fixo') return Math.min(promocao.desconto, subtotal)
  if (promocao.tipo === 'percentual') return parseFloat(((subtotal * promocao.percentual) / 100).toFixed(2))
  return 0
}