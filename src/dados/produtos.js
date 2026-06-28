export const categorias = [
  { id: 'cafe-da-manha', nome: 'Café da manhã' },
  { id: 'tapiocas', nome: 'Tapiocas' },
  { id: 'cuscuz', nome: 'Cuscuz' },
  { id: 'bebidas', nome: 'Bebidas' },
]

// unidadesDisponiveis: todas
export const produtos = [

  // café da manhã
  {
    id: 'cafe-nordestino',
    nome: 'Café Nordestino',
    descricao: 'Combo bem quentinho com café coado, cuscuz com queijo, aipim assado na manteiga, pães e charque.',
    categoria: 'cafe-da-manha',
    preco: 45.90,
    imagem: `${import.meta.env.BASE_URL}img/cafe-nordestino.jpeg`,
    disponivel: true,
    sazonal: false,
    unidadesDisponiveis: 'todas',
    personalizacoes: [
      {
        id: 'adocante',
        nome: 'Adoçante',
        obrigatorio: false,
        opcoes: [
          { id: 'com-rapadura', label: 'Com rapadura', adicional: 0 },
          { id: 'sem-acucar',  label: 'Sem açúcar',   adicional: 0 },
        ],
      },
    ],
  },
  {
    id: 'bolo-macaxeira',
    nome: 'Bolo de Macaxeira',
    descricao: 'Bolo úmido feito com maxaceira fresca ralada na hora. Levemente adocicado, com coco ralado na cobertura.',
    categoria: 'cafe-da-manha',
    preco: 14.90,
    imagem: `${import.meta.env.BASE_URL}img/bolo-macaxeira.webp`,
    disponivel: true,
    sazonal: true,
    unidadesDisponiveis: ['rj-centro', 'pe-centro', 'sp-centro'],
    personalizacoes: [],
  },

  {
    id: 'bolo-rolo',
    nome: 'Bolo de Rolo',
    descricao: 'O clássico bolo de rolo em fatias generosas. Massa fininha com camadas de goiabada artesanal.',
    categoria: 'cafe-da-manha',
    preco: 12.00,
    imagem: `${import.meta.env.BASE_URL}img/bolo-rolo.jpeg`,
    disponivel: true,
    sazonal: false,
    unidadesDisponiveis: ['rj-centro', 'sp-centro'],
    personalizacoes: [],
  },

  // tapiocas
  {
    id: 'tapioca-queijo',
    nome: 'Tapioca com Queijo Coalho',
    descricao: 'Tapioca feita na hora com queijo coalho derretido e geleia de pimenta. Crocante por fora, derretida por dentro.',
    categoria: 'tapiocas',
    preco: 16.90,
    imagem: `${import.meta.env.BASE_URL}img/tapioca-queijo.webp`,
    disponivel: true,
    sazonal: false,
    unidadesDisponiveis: 'todas',
    personalizacoes: [
      {
        id: 'tamanho',
        nome: 'Tamanho',
        obrigatorio: true,
        opcoes: [
          { id: 'media',  label: 'Média',  adicional: 0 },
          { id: 'grande', label: 'Grande', adicional: 4.00 },
        ],
      },
    ],
  },
  {
    id: 'tapioca-frango',
    nome: 'Tapioca com Frango e Catupiry',
    descricao: 'Tapioca recheada com frango desfiado temperado e catupiry cremoso. Porção generosa.',
    categoria: 'tapiocas',
    preco: 19.90,
    imagem: `${import.meta.env.BASE_URL}img/tapioca-frango.jpg`,
    disponivel: true,
    sazonal: false,
    unidadesDisponiveis: 'todas',
    personalizacoes: [
      {
        id: 'tamanho',
        nome: 'Tamanho',
        obrigatorio: true,
        opcoes: [
          { id: 'media',  label: 'Média',  adicional: 0 },
          { id: 'grande', label: 'Grande', adicional: 4.00 },
        ],
      },
    ],
  },
  {
    id: 'tapioca-coco',
    nome: 'Tapioca Doce com Coco',
    descricao: 'Tapioca adocicada com recheio de coco fresco ralado e leite condensado. Uma sobremesa nordestina.',
    categoria: 'tapiocas',
    preco: 14.00,
    imagem: `${import.meta.env.BASE_URL}img/tapioca-doce.jpg`,
    disponivel: true,
    sazonal: true,
    unidadesDisponiveis: ['rj-centro', 'pe-centro'],
    personalizacoes: [],
  },

  // Cuscuz
  {
    id: 'cuscuz-queijo',
    nome: 'Cuscuz de Milho com Queijo',
    descricao: 'Cuscuz nordestino feito com fubá fino e queijo coalho. Acompanha manteiga de garrafa e café.',
    categoria: 'cuscuz',
    preco: 12.00,
    imagem: `${import.meta.env.BASE_URL}img/cuscuz-queijo.jpg`,
    disponivel: true,
    sazonal: false,
    unidadesDisponiveis: 'todas',
    personalizacoes: [],
  },
  {
    id: 'cuscuz-charque',
    nome: 'Cuscuz com Charque',
    descricao: 'Cuscuz temperado com charque desfiado frito na manteiga de garrafa. Receita tradicional da região.',
    categoria: 'cuscuz',
    preco: 18.00,
    imagem: `${import.meta.env.BASE_URL}img/cuscuz-charque.avif`,
    disponivel: true,
    sazonal: false,
    unidadesDisponiveis: 'todas',
    personalizacoes: [],
  },
  {
    id: 'pamonha',
    nome: 'Pamonha',
    descricao: 'Pamonha artesanal de milho verde, feita na folha. Disponível doce ou salgada.',
    categoria: 'cuscuz',
    preco: 10.00,
    imagem: `${import.meta.env.BASE_URL}img/pamonha.webp`,
    disponivel: true,
    sazonal: true,
    unidadesDisponiveis: ['rj-centro', 'sp-centro', 'pe-centro'],
    personalizacoes: [
      {
        id: 'tipo',
        nome: 'Tipo',
        obrigatorio: true,
        opcoes: [
          { id: 'doce',    label: 'Doce',    adicional: 0 },
          { id: 'salgada', label: 'Salgada', adicional: 0 },
        ],
      },
    ],
  },

  // exclusivos por cidade
  // RJ
  {
    id: 'caldinho-feijao',
    nome: 'Caldinho de Feijão',
    descricao: 'Caldinho de feijão muito bem temperado com torresmo.',
    categoria: 'cuscuz',
    preco: 13.90,
    imagem: `${import.meta.env.BASE_URL}img/caldinho-feijao.jpg`,
    disponivel: true,
    sazonal: false,
    exclusivo: true,
    unidadesDisponiveis: ['rj-centro'],
    personalizacoes: [],
  },
  {
    id: 'fritas-aipim-rj',
    nome: 'Fritas de Aipim',
    descricao: 'Fritas de aipim, crocantes por fora e macias por dentro. Acompanha molho à escolha.',
    categoria: 'cuscuz',
    preco: 18.90,
    imagem: `${import.meta.env.BASE_URL}img/fritas-aipim.avif`,
    disponivel: true,
    sazonal: false,
    exclusivo: true,
    unidadesDisponiveis: ['rj-centro'],
    personalizacoes: [
      {
        id: 'molho',
        nome: 'Molho',
        obrigatorio: true,
        opcoes: [
          { id: 'geleia-pimenta', label: 'Geleia de pimenta', adicional: 0 },
          { id: 'manteiga-garrafa', label: 'Manteiga de garrafa', adicional: 0 },
        ],
      },
    ],
  },

  // Recife
  {
    id: 'acaraje-camarao',
    nome: 'Acarajé com Camarão',
    descricao: 'Acarajé crocante e quentinho com camarões bem grandes!',
    categoria: 'tapiocas',
    preco: 29.90,
    imagem: `${import.meta.env.BASE_URL}img/acaraje-camarao.png`,
    disponivel: true,
    sazonal: false,
    exclusivo: true,
    unidadesDisponiveis: ['pe-centro'],
    personalizacoes: [],
  },

  // SP
  {
    id: 'escondidinho-charque',
    nome: 'Escondidinho de Charque',
    descricao: 'O escondidnho de mandioca clássico com recheio de charque perfeitamente temperado.',
    categoria: 'cuscuz',
    preco: 32.90,
    imagem: `${import.meta.env.BASE_URL}img/escondidinho-charque.jpg`,
    disponivel: true,
    sazonal: false,
    exclusivo: true,
    unidadesDisponiveis: ['sp-centro'],
    personalizacoes: [],
  },

  // Curitiba
  {
    id: 'cuscuz-ovo-queijo',
    nome: 'Cuscuz com ovo e Queijo',
    descricao: 'O clássico cuscuz de milho com queijo coalho acompanhado de ovo frito com a gema bem molinha.',
    categoria: 'cuscuz',
    preco: 16.90,
    imagem: `${import.meta.env.BASE_URL}img/cuscuz-ovo.webp`,
    disponivel: true,
    sazonal: false,
    exclusivo: true,
    unidadesDisponiveis: ['pr-centro'],
    personalizacoes: [],
  },

  // Florianópolis
  {
    id: 'fritas-aipim-charque',
    nome: 'Fritas de Aipim com Charque',
    descricao: 'As melhores fritas de aipim acompanhadas de charque temperado com manteiga de garrafa.',
    categoria: 'cuscuz',
    preco: 24.90,
    imagem: `${import.meta.env.BASE_URL}img/aipim-charque.jpg`,
    disponivel: true,
    sazonal: false,
    exclusivo: true,
    unidadesDisponiveis: ['sc-centro'],
    personalizacoes: [],
  },
  {
    id: 'bolinho-mandioca',
    nome: 'Bolinho de Mandioca',
    descricao: '8 bolinhos de mandioca recheados com carne seca. Crocantes, macios e deliciosos. Acompanha geleia de pimenta.',
    categoria: 'cuscuz',
    preco: 22.90,
    imagem: `${import.meta.env.BASE_URL}img/bolinho-mandioca.webp`,
    disponivel: true,
    sazonal: false,
    exclusivo: true,
    unidadesDisponiveis: ['sc-centro'],
    personalizacoes: [],
  },

  // bebidas
  {
    id: 'suco-laranja',
    nome: 'Suco de Laranja 500ml',
    descricao: 'Suco de laranja natural espremido na hora, sem adição de açúcar ou conservantes.',
    categoria: 'bebidas',
    preco: 8.00,
    imagem: `${import.meta.env.BASE_URL}img/suco-laranja.png`,
    disponivel: true,
    sazonal: false,
    unidadesDisponiveis: 'todas',
    personalizacoes: [],
  },
  {
    id: 'suco-caju',
    nome: 'Suco de Caju 400ml',
    descricao: 'Suco de caju natural, levemente adocicado. Fruta típica do Nordeste.',
    categoria: 'bebidas',
    preco: 9.50,
    imagem: `${import.meta.env.BASE_URL}img/suco-caju.png`,
    disponivel: true,
    sazonal: false,
    unidadesDisponiveis: ['pe-centro', 'rj-centro'],
    personalizacoes: [],
  },
  {
    id: 'vitamina-frutas',
    nome: 'Vitamina de Frutas',
    descricao: 'Vitamina cremosa com mix de frutas tropicais da época, leite e mel. Em breve disponível na sua unidade.',
    categoria: 'bebidas',
    preco: 11.00,
    imagem: `${import.meta.env.BASE_URL}img/vitamina.jpg`,
    disponivel: false,
    sazonal: false,
    unidadesDisponiveis: 'todas',
    personalizacoes: [],
  },
]

export function getProdutosPorUnidade(unidadeId) {
  return produtos
    .filter((p) => {
      // exclusivos só aparecem na unidade deles, não ficam como "indisponível" em outras
      if (p.exclusivo) {
          return p.unidadesDisponiveis === 'todas' || p.unidadesDisponiveis.includes(unidadeId)
        }
        return true
    })
    .map((p) => ({
      ...p,
      disponivelNaUnidade:
        p.disponivel &&
        (p.unidadesDisponiveis === 'todas' || p.unidadesDisponiveis.includes(unidadeId)),
    }))
    .sort((a, b) => (b.exclusivo ? 1 : 0) - (a.exclusivo ? 1 : 0))
}

export function getProdutoPorId(id) {
  return produtos.find((p) => p.id === id) ?? null
}


