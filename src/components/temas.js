export const temas = [
  {
    id: 'ofertao-dia',
    nome: 'Ofertão do Dia',
    formatos: {
      feed: {
        imagemFundo: '/temas/feed.png',
        largura: 1080,
        altura: 1080,
        posicoes: [
          {
            tipo: 'produto',
            imagem: { x: 385, y: 306, largura: 306, altura: 316 },
            nome: { x: 105, y: 696, fonte: 47 },
            preco: { x: 728, y: 696, fonte: 47 }
          }
        ]
      },
      story: {
        imagemFundo: '/temas/storie.png',
        largura: 1080,
        altura: 1920,
        posicoes: [
          {
            tipo: 'produto',
            imagem: { x: 272, y: 646, largura: 534, altura: 562 },
            nome: { x: 281, y: 1247, fonte: 80 },
            preco: { x: 281, y: 1500, fonte: 80 }
          }
        ]
      },
      tv: {
        imagemFundo: '/temas/tv.png',
        largura: 1920,
        altura: 1080,
        posicoes: [
          {
            tipo: 'produto',
            imagem: { x: 318, y: 431, largura: 337, altura: 431 },
            nome: { x: 910, y: 515, fonte: 84 },
            preco: { x: 1145, y: 703, fonte: 84 }
          }
        ]
      }
    }
  }
];
