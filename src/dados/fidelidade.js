export const dadosFidelidade = {
  pontos: 320,
  pontosProximoNivel: 500,
  nivel: 'Prata',
  beneficios: [
    
    {
      id: 'beneficio-10',
      titulo: '10% de desconto',
      descricao: 'em sua primeira compra',
      pontos: 200,
    },
    {
      id: 'beneficio-combo',
      titulo: 'Combo Especial',
      descricao: 'Tapioca + Suco',
      pontos: 300,
    },
    {
      id: 'beneficio-frete',
      titulo: 'Frete grátis',
      descricao: 'Em compras acima de R$30',
      pontos: 250,
    },
  ],
  historico: [
    { id: 'h1', descricao: 'Compra — Pedido #1234', pontos: 47, data: '21/05/2026', tipo: 'ganho' },
    { id: 'h2', descricao: 'Compra — Pedido #1198', pontos: 32, data: '10/05/2026', tipo: 'ganho' },
    { id: 'h3', descricao: 'Resgate — 10% desconto', pontos: 200, data: '28/04/2026', tipo: 'resgate' },
    { id: 'h4', descricao: 'Compra — Pedido #1067', pontos: 85, data: '15/04/2026', tipo: 'ganho' },
    { id: 'h5', descricao: 'Compra — Pedido #0891', pontos: 156, data: '02/03/2026', tipo: 'ganho' },
  ],
}
