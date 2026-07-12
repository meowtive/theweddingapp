export type Gift = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  image: string;
  /** Flip to true + redeploy after someone pays via Abacate */
  presented: boolean;
};

export const gifts: Gift[] = [
  {
    id: "lua-de-mel-paris",
    name: "Contribuição lua de mel — Paris",
    description: "Ajude no nosso primeiro café com vista para a Torre Eiffel.",
    priceInCents: 50000,
    image:
      "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "jantar-romantico",
    name: "Jantar romântico",
    description: "Uma noite especial a dois depois do grande dia.",
    priceInCents: 35000,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "noite-hotel",
    name: "Noite de hotel",
    description: "Um descanso merecido após a festa.",
    priceInCents: 45000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "passeio-barco",
    name: "Passeio de barco",
    description: "Um momento a dois com brisa e paisagem.",
    priceInCents: 28000,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "spa-casal",
    name: "Dia de spa a dois",
    description: "Massagem e relaxamento para começar bem a vida a dois.",
    priceInCents: 40000,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "airfryer",
    name: "Air fryer",
    description: "Para receitas práticas no dia a dia.",
    priceInCents: 45000,
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e87?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "cafeteira",
    name: "Cafeteira espresso",
    description: "Nossos cafés da manhã com muito mais aroma.",
    priceInCents: 120000,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "jogo-panelas",
    name: "Jogo de panelas",
    description: "Para cozinhar juntos com tranquilidade.",
    priceInCents: 55000,
    image:
      "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "kit-facas",
    name: "Kit de facas profissionais",
    description: "Corte preciso para as receitas favoritas.",
    priceInCents: 32000,
    image:
      "https://images.unsplash.com/photo-1593618998160-e34014e67546?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "liquidificador",
    name: "Liquidificador",
    description: "Sucos, vitaminas e molhos em segundos.",
    priceInCents: 28000,
    image:
      "https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "mixer",
    name: "Mixer / batedeira",
    description: "Para massas, cremes e sobremesas.",
    priceInCents: 25000,
    image:
      "https://images.unsplash.com/photo-1585515320310-259814833e87?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "jogo-toalhas",
    name: "Jogo de toalhas",
    description: "Conforto macio no banheiro do novo lar.",
    priceInCents: 22000,
    image:
      "https://images.unsplash.com/photo-1631889993959-41b4e9c6e3c5?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "jogo-lençois",
    name: "Jogo de lençóis",
    description: "Noites mais aconchegantes.",
    priceInCents: 30000,
    image:
      "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "edredom",
    name: "Edredom king",
    description: "Aconchego para o nosso quarto.",
    priceInCents: 38000,
    image:
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "travesseiros",
    name: "Par de travesseiros",
    description: "Sono reparador todos os dias.",
    priceInCents: 18000,
    image:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "jogo-jantar",
    name: "Aparelho de jantar",
    description: "Para receber família e amigos com elegância.",
    priceInCents: 48000,
    image:
      "https://images.unsplash.com/photo-1578500351865-d6c8c0d0f657?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "taças-vinho",
    name: "Jogo de taças de vinho",
    description: "Brindes especiais em casa.",
    priceInCents: 20000,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "jogo-talheres",
    name: "Faqueiro completo",
    description: "Mesa posta com tudo no lugar.",
    priceInCents: 35000,
    image:
      "https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "aspirador",
    name: "Aspirador de pó",
    description: "Casa limpa com menos esforço.",
    priceInCents: 65000,
    image:
      "https://images.unsplash.com/photo-1558317374-067fb5f40135?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "ferro-passar",
    name: "Ferro a vapor",
    description: "Roupas impecáveis no dia a dia.",
    priceInCents: 22000,
    image:
      "https://images.unsplash.com/photo-1582735689369-4fe89db7114c?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "ventilador",
    name: "Ventilador de torre",
    description: "Conforto térmico nos dias quentes.",
    priceInCents: 28000,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "umidificador",
    name: "Umidificador de ar",
    description: "Ambiente mais agradável para dormir.",
    priceInCents: 20000,
    image:
      "https://images.unsplash.com/photo-1585771724680-ef6c4c48baaa?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "kit-jardim",
    name: "Kit jardinagem",
    description: "Plantas e vida na varanda.",
    priceInCents: 15000,
    image:
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "quadro-decorativo",
    name: "Quadro decorativo",
    description: "Arte para personalizar a sala.",
    priceInCents: 25000,
    image:
      "https://images.unsplash.com/photo-1513519245088-0e12902e35a6?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "luminaria",
    name: "Luminária de mesa",
    description: "Luz aconchegante para leituras.",
    priceInCents: 18000,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "jogo-copos",
    name: "Jogo de copos",
    description: "Do dia a dia aos brindes especiais.",
    priceInCents: 12000,
    image:
      "https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "forma-bolo",
    name: "Kit formas e assadeiras",
    description: "Para bolos, lasanhas e forno cheio.",
    priceInCents: 16000,
    image:
      "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "churrasqueira",
    name: "Kit churrasco",
    description: "Domingos em família com sabor.",
    priceInCents: 42000,
    image:
      "https://images.unsplash.com/photo-1555939596-1928bb21d1d1?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "vinhos",
    name: "Seleção de vinhos",
    description: "Para celebrar datas especiais em casa.",
    priceInCents: 30000,
    image:
      "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "experiencia-culinaria",
    name: "Aula de culinária a dois",
    description: "Aprender uma receita nova juntos.",
    priceInCents: 35000,
    image:
      "https://images.unsplash.com/photo-1556911220-bff31c875d1c?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "fotografia",
    name: "Ensaio pós-casamento",
    description: "Registrar o início da vida a dois.",
    priceInCents: 80000,
    image:
      "https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "contribuicao-viagem",
    name: "Contribuição viagem — livre",
    description: "Qualquer valor que ajude na nossa aventura.",
    priceInCents: 10000,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "caixa-memórias",
    name: "Caixa de memórias",
    description: "Para guardar cartas, fotos e lembranças.",
    priceInCents: 15000,
    image:
      "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "kit-café-da-manha",
    name: "Kit café da manhã",
    description: "Café especial, geleias e momentos calmos.",
    priceInCents: 18000,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "smart-speaker",
    name: "Caixa de som",
    description: "Trilha sonora para o nosso lar.",
    priceInCents: 55000,
    image:
      "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
];

export function getGiftById(id: string) {
  return gifts.find((gift) => gift.id === id);
}
