export type Gift = {
  id: string;
  name: string;
  description: string;
  priceInCents: number;
  image: string;
  /** Retailer product page — optional card checkout via store */
  productUrl?: string;
  /** Flip to true + redeploy after someone presents */
  presented: boolean;
};

/**
 * Vales + experiências Chile/Santiago + lista da casa (Sara).
 * PIX: wedding.pix — productUrl opens the store for card payment when available.
 */
export const gifts: Gift[] = [
  // —— Vales ——
  {
    id: "voucher-150",
    name: "Vale-presente R$ 150",
    description: "Uma contribuição livre para o que precisarmos na nova casa.",
    priceInCents: 15000,
    image: "/images/gifts/voucher-150.jpg",
    presented: false,
  },
  {
    id: "voucher-200",
    name: "Vale-presente R$ 200",
    description: "Um presente flexível — usamos onde fizer mais sentido.",
    priceInCents: 20000,
    image: "/images/gifts/voucher-200.jpg",
    presented: false,
  },
  {
    id: "voucher-300",
    name: "Vale-presente R$ 300",
    description: "Ajude a montar o lar — valor livre para nossos planos.",
    priceInCents: 30000,
    image: "/images/gifts/voucher-300.jpg",
    presented: false,
  },

  // —— Lua de mel Chile / Santiago ——
  {
    id: "jantar-santiago",
    name: "Jantar romântico em Santiago",
    description:
      "Uma noite especial a dois — Lastarria, Bellavista ou Providencia.",
    priceInCents: 35000,
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "noite-hotel-santiago",
    name: "Upgrade de hotel em Santiago",
    description: "Um toque a mais de conforto depois dos passeios.",
    priceInCents: 45000,
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "vinicola-maipo",
    name: "Tour em vinícola — Vale do Maipo",
    description: "Degustação de Carménère e Cabernet com vista para os Andes.",
    priceInCents: 40000,
    image:
      "https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "cajon-del-maipo",
    name: "Passeio no Cajón del Maipo",
    description: "Cordilheira, ar puro e paisagem de tirar o fôlego.",
    priceInCents: 32000,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "san-cristobal",
    name: "Teleférico San Cristóbal",
    description: "Vista panorâmica de Santiago do Cerro San Cristóbal.",
    priceInCents: 18000,
    image:
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "valparaiso",
    name: "Dia em Valparaíso",
    description: "Cores, mirantes e brisa do Pacífico — bate-volta a dois.",
    priceInCents: 38000,
    image:
      "https://images.unsplash.com/photo-1531968455001-5c5272a41129?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "spa-termas-chile",
    name: "Dia de spa / termas",
    description: "Relaxamento a dois para começar bem a vida casada.",
    priceInCents: 40000,
    image:
      "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "cafe-santiago",
    name: "Café com vista em Santiago",
    description: "Nosso primeiro café chileno com vista para a cidade.",
    priceInCents: 12000,
    image:
      "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "mercado-central",
    name: "Almoço no Mercado Central",
    description: "Mariscos e sabor local no coração de Santiago.",
    priceInCents: 22000,
    image:
      "https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "passeio-barco-chile",
    name: "Passeio de barco no Pacífico",
    description: "Um momento a dois com brisa e oceano chileno.",
    priceInCents: 28000,
    image:
      "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },
  {
    id: "contribuicao-chile",
    name: "Contribuição Chile — livre",
    description: "Qualquer valor que ajude nas experiências da lua de mel.",
    priceInCents: 10000,
    image:
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=900&q=80",
    presented: false,
  },

  // —— Casa (Sara) ——
  {
    id: "jogo-panelas-ceramica",
    name: "Jogo de panelas cerâmica",
    description: "Brinox Ceramic Life Sirius Vanilla — 6 peças, cores claras.",
    priceInCents: 58812,
    image: "/images/gifts/jogo-panelas-ceramica.jpg",
    productUrl:
      "https://www.mercadolivre.com.br/jogo-de-panelas-6-pecas-ceramic-life-sirius-vanilla-brinox-b/up/MLBU3461023192",
    presented: false,
  },
  {
    id: "frigideiras",
    name: "Frigideiras (pequena e grande)",
    description: "Tramontina Veronese Linho — conjunto 2 peças.",
    priceInCents: 8999,
    image: "/images/gifts/frigideiras.jpg",
    productUrl:
      "https://www.magazineluiza.com.br/conjunto-de-frigideiras-tramontina-veronese-linho-2-pecas/p/241222900/ud/udfg/",
    presented: false,
  },
  {
    id: "panela-pressao",
    name: "Panela de pressão",
    description: "Brinox Ceramic Pressure Vanilla — 6,8L indução.",
    priceInCents: 17999,
    image: "/images/gifts/panela-pressao.jpg",
    productUrl:
      "https://www.mercadolivre.com.br/panela-pressao-brinox-4952103-ceramic-pressure-inducao-68l-vanilla/p/MLB22931744",
    presented: false,
  },
  {
    id: "assadeiras-vidro",
    name: "Assadeiras de vidro",
    description: "Conjunto de assadeiras de vidro para forno e mesa.",
    priceInCents: 25100,
    image: "/images/gifts/assadeiras-vidro.jpg",
    presented: false,
  },
  {
    id: "formas-bolo",
    name: "Conjunto de formas 7 peças",
    description: "Benditolar / Arary — formas polidas para bolo, pizza, pão e assados.",
    priceInCents: 12990,
    image: "/images/gifts/formas-bolo.jpg",
    productUrl:
      "https://www.mercadolivre.com.br/conjunto-de-formas-polidas-benditolar-7-pecas-cor-polido/p/MLB53012283",
    presented: false,
  },
  {
    id: "jogo-facas",
    name: "Jogo de facas",
    description: "Tramontina Plenus off-white — aço inox, 8 peças.",
    priceInCents: 11495,
    image: "/images/gifts/jogo-facas.jpg",
    productUrl:
      "https://www.tramontina.com.br/jogo-de-facas-tramontina-plenus-com-laminas-em-aco-inox-e-cabos-de-polipropileno-off-white-8-pecas/23498332.html",
    presented: false,
  },
  {
    id: "potes-hermeticos",
    name: "Potes herméticos",
    description: "Jogo de potes de vidro com tampa de bambu — 4 peças.",
    priceInCents: 10990,
    image: "/images/gifts/potes-hermeticos.jpg",
    productUrl:
      "https://www.mercadolivre.com.br/eps-709-13-potes-vidro-mantimentos-hermeticos-com-tampa-bambu-alta-resistncia-epsilon/p/MLB44648973",
    presented: false,
  },
  {
    id: "aparelho-jantar",
    name: "Aparelho de jantar",
    description: "Tramontina Leonora em porcelana — 20 peças.",
    priceInCents: 41515,
    image: "/images/gifts/aparelho-jantar.jpg",
    productUrl:
      "https://www.tramontina.com.br/aparelho-de-jantar-tramontina-leonora-em-porcelana-20-pecas/96010289.html",
    presented: false,
  },
  {
    id: "faqueiro",
    name: "Faqueiro",
    description: "Tramontina Búzios — aço inox, 24 peças.",
    priceInCents: 13500,
    image: "/images/gifts/faqueiro.jpg",
    productUrl:
      "https://www.mercadolivre.com.br/jogo-talheres-faqueiro-buzios-aco-inox-24-pecas-tramontina/p/MLB35092029",
    presented: false,
  },
  {
    id: "jogo-copos",
    name: "Jogo de copos",
    description: "Jogo de copos canelados ~430ml — 6 peças.",
    priceInCents: 4799,
    image: "/images/gifts/jogo-copos.jpg",
    productUrl:
      "https://www.mercadolivre.com.br/jogo-de-copos-420ml-elegante-resistente-canelado-pratico/p/MLB34215455",
    presented: false,
  },
  {
    id: "travessas",
    name: "Travessas",
    description: "Kit Tramontina Cosmos para assar e servir — 4 peças.",
    priceInCents: 45125,
    image: "/images/gifts/travessas.jpg",
    productUrl:
      "https://www.tramontina.com.br/kit-para-assar-e-servir-tramontina-cosmos-em-aco-inox-com-acabamento-fosco-e-tampa-de-vidro-4-pecas/64310150.html",
    presented: false,
  },
  {
    id: "air-fryer",
    name: "Air fryer",
    description: "Britânia BFR38 — fritadeira elétrica 4,2L.",
    priceInCents: 21990,
    image: "/images/gifts/air-fryer.jpg",
    productUrl:
      "https://www.britania.com.br/fritadeira-air-fryer-bfr38-127v-063801097/p?idsku=22503",
    presented: false,
  },
  {
    id: "liquidificador-arno",
    name: "Liquidificador",
    description: "Arno Power Max 2200 marfim LN64 — cores claras.",
    priceInCents: 24999,
    image: "/images/gifts/liquidificador-arno.jpg",
    productUrl:
      "https://www.magazineluiza.com.br/liquidificador-arno-power-max-2200-marfim-ln64/p/241081900/ep/liqu/",
    presented: false,
  },
  {
    id: "sanduicheira",
    name: "Sanduicheira",
    description: "Britânia BGR16 Redstone — cores claras.",
    priceInCents: 18990,
    image: "/images/gifts/sanduicheira.jpg",
    productUrl:
      "https://www.amazon.com.br/Sanduicheira-Grill-Brit%C3%A2nia-BGR16-Redstone/dp/B0CJ3R1537",
    presented: false,
  },
  {
    id: "torradeira-electrolux",
    name: "Torradeira",
    description: "Electrolux ETS25 — 7 níveis de tostagem.",
    priceInCents: 19990,
    image: "/images/gifts/torradeira-electrolux.jpg",
    productUrl:
      "https://www.amazon.com.br/Electrolux-4310AOBR407-Torradeira-ETS25/dp/B09CBWDVH4",
    presented: false,
  },
  {
    id: "mixer-philips",
    name: "Mixer",
    description: "Philips Walita RI2622 branco — cores claras.",
    priceInCents: 20990,
    image: "/images/gifts/mixer-philips.jpg",
    productUrl:
      "https://www.amazon.com.br/Mixer-Philips-RI2622-32-branco/dp/B0873XXMXZ",
    presented: false,
  },
  {
    id: "processador-mondial",
    name: "Processador de alimentos",
    description: "Mondial Multiprocessador Turbo 1000W branco.",
    priceInCents: 34990,
    image: "/images/gifts/processador-mondial.jpg",
    productUrl:
      "https://www.amazon.com.br/MONDIAL-Multiprocessador-Turbo-Branco-1000W/dp/B0GPZTFPY3",
    presented: false,
  },
  {
    id: "chaleira-britania",
    name: "Chaleira elétrica",
    description: "Britânia 2,1L de vidro com LED — cores claras.",
    priceInCents: 19990,
    image: "/images/gifts/chaleira-britania.jpg",
    productUrl:
      "https://www.mercadolivre.com.br/britnia-bch20c-chaleira-eletrica-2l-branco/p/MLB69728049",
    presented: false,
  },
  {
    id: "panificadora-britania",
    name: "Panificadora",
    description: "Britânia Multipane — 12 programas.",
    priceInCents: 51990,
    image: "/images/gifts/panificadora-britania.jpg",
    productUrl:
      "https://www.magazineluiza.com.br/panificadora-britania-multipane-branca-12-programas/p/023305000/ep/pani/",
    presented: false,
  },
  {
    id: "jogo-cama-king",
    name: "Jogo de cama",
    description:
      "Zelo Alexandre Herchcovitch — Queen, percal 180 fios, 100% algodão.",
    priceInCents: 29750,
    image: "/images/gifts/jogo-cama-king.jpg",
    productUrl:
      "https://www.zelo.com.br/jogo-de-cama-alexandre-herchcovitch-queen-percal-180-fios-100-algodao-p985250",
    presented: false,
  },
  {
    id: "edredom-king",
    name: "Edredom king",
    description: "Edredom tamanho king / casal.",
    priceInCents: 16999,
    image: "/images/gifts/edredom-king.jpg",
    presented: false,
  },
  {
    id: "cobertores-king",
    name: "Cobertores king",
    description: "Coberdrom / cobertor tamanho king.",
    priceInCents: 19990,
    image: "/images/gifts/cobertores-king.jpg",
    presented: false,
  },
  {
    id: "travesseiros",
    name: "Travesseiros",
    description: "Par de travesseiros de fibra siliconizada.",
    priceInCents: 8390,
    image: "/images/gifts/travesseiros.jpg",
    presented: false,
  },
  {
    id: "almofadas",
    name: "Almofadas",
    description: "Kit de almofadas decorativas para a sala.",
    priceInCents: 12990,
    image: "/images/gifts/almofadas.jpg",
    presented: false,
  },
  {
    id: "protetor-colchao",
    name: "Protetor de colchão",
    description: "Protetor impermeável king — Ortobom.",
    priceInCents: 15391,
    image: "/images/gifts/protetor-colchao.jpg",
    presented: false,
  },
  {
    id: "geladeira-brastemp",
    name: "Geladeira",
    description: "Brastemp Frost Free French Door 3 portas branca BRO85MB.",
    priceInCents: 559900,
    image: "/images/gifts/geladeira-brastemp.jpg",
    productUrl:
      "https://www.brastemp.com.br/geladeira-frost-free-french-door-3-portas-branca-brastemp-bro85mb/p?idsku=326196066",
    presented: false,
  },
  {
    id: "fogao-cooktop",
    name: "Fogão / cooktop",
    description: "Electrolux Efficient 5 bocas — mesa de vidro (KE5GR).",
    priceInCents: 68900,
    image: "/images/gifts/fogao-cooktop.jpg",
    productUrl:
      "https://loja.electrolux.com.br/cooktop-5-bocas-electrolux-gas-efficient-mesa-de-vidro-e-grade-de-aco-fosco--ke5gr-/p?idsku=310128208",
    presented: false,
  },
  {
    id: "microondas-brastemp",
    name: "Micro-ondas",
    description: "Brastemp 32L cinza espelhado com menu gourmet (BMS46AR).",
    priceInCents: 87327,
    image: "/images/gifts/microondas-brastemp.jpg",
    productUrl:
      "https://www.brastemp.com.br/micro-ondas-brastemp-32-litros-cor-cinza-espelhado-com-menu-gourmet-bms46ar/p?idsku=326030627",
    presented: false,
  },
  {
    id: "lava-seca-electrolux",
    name: "Lava e seca",
    description: "Electrolux LSC12 12kg Inverter cinza ônix.",
    priceInCents: 419900,
    image: "/images/gifts/lava-seca-electrolux.jpg",
    productUrl:
      "https://www.magazineluiza.com.br/lava-e-seca-electrolux-12kg-lsc12-inverter-agua-fria-e-quente-cinza-onix/p/241187000/ed/ela1/",
    presented: false,
  },
  {
    id: "forno-britania",
    name: "Forno elétrico",
    description: "Britânia BFE55P 52L — dupla resistência.",
    priceInCents: 39990,
    image: "/images/gifts/forno-britania.jpg",
    productUrl:
      "https://www.mercadolivre.com.br/forno-eletrico-britnia-52l-dupla-resistncia-bfe55p/p/MLB29117695",
    presented: false,
  },
  {
    id: "purificador-electrolux",
    name: "Purificador de água",
    description: "Electrolux PE11B — painel touch, branco.",
    priceInCents: 49990,
    image: "/images/gifts/purificador-electrolux.jpg",
    productUrl:
      "https://www.casasbahia.com.br/purificador-de-agua-electrolux-pe11b-com-painel-touch-bivolt-branco/p/11688765",
    presented: false,
  },
  {
    id: "smart-tv",
    name: "Smart TV",
    description: "Smart TV Samsung 55\" Crystal UHD 4K.",
    priceInCents: 299900,
    image: "/images/gifts/smart-tv.jpg",
    presented: false,
  },
  {
    id: "sofa",
    name: "Sofá-cama Fasano",
    description: "Casa Box — sofá-cama retrátil com molas ensacadas (à vista).",
    priceInCents: 307402,
    image: "/images/gifts/sofa.jpg",
    productUrl:
      "https://www.casabox.com.br/moveis/sala-de-estar/sofas-cama/sofa-cama-fasano-sem-caixa-molas-ensacadas?parceiro=4446&variant_id=17410",
    presented: false,
  },
  {
    id: "colchao",
    name: "Colchão",
    description: "Colchão king Ortobom Light D45.",
    priceInCents: 272999,
    image: "/images/gifts/colchao.jpg",
    presented: false,
  },
  {
    id: "guarda-roupa",
    name: "Guarda-roupa Isabela",
    description: "Casas Bahia — casal com espelho, 3 portas de correr.",
    priceInCents: 234001,
    image: "/images/gifts/guarda-roupa.jpg",
    productUrl:
      "https://www.casasbahia.com.br/guarda-roupa-casal-com-espelho-3-portas-de-correr-isabela/p/12839733",
    presented: false,
  },
  {
    id: "rack",
    name: "Rack",
    description: "Rack para TV até 65\" — ~180 cm.",
    priceInCents: 57776,
    image: "/images/gifts/rack.jpg",
    presented: false,
  },
];

export function getGiftById(id: string) {
  return gifts.find((gift) => gift.id === id);
}
