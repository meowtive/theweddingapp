export const wedding = {
  groom: "Rafael",
  bride: "Sara",
  names: "Rafael & Sara",
  tagline:
    "Diante da vastidão do tempo e da imensidão do universo, é um imenso prazer para mim dividir um planeta e uma época com você",
  dateLabel: "13. 12. 2026.",
  /** Ceremony at 15h — countdown target */
  dateISO: "2026-12-13T15:00:00-03:00",
  venue: {
    name: "Star Eventos",
    street: "Rua Mario Maruca, SN",
    neighborhood: "Jardim Vitória",
    city: "Suzano",
    state: "SP",
    fullAddress: "Rua Mario Maruca, SN — Jardim Vitória, Suzano — SP",
    mapEmbedUrl:
      "https://maps.google.com/maps?q=Star+Eventos+Rua+Mario+Maruca+Jardim+Vit%C3%B3ria+Suzano&t=&z=15&ie=UTF8&iwloc=&output=embed",
    mapLink:
      "https://www.google.com/maps/search/?api=1&query=Star+Eventos+Rua+Mario+Maruca+Jardim+Vit%C3%B3ria+Suzano",
  },
  about: {
    eyebrow: "Nossa história",
    body: [
      "Tudo começou em novembro de 2023. Nosso primeiro encontro foi num cinema ao ar livre, num parque, à noite. Tinha aquele ar de filme americano. Eu já sabia que aquela noite seria especial.",
      "Depois veio o Natal. Conheci a família dela inteira. Estávamos os dois sem jeito, nervosos. Mesmo assim, nunca vou esquecer aquela noite. Ela estava tão linda.",
      "No terceiro encontro, dei a ela uma Bíblia de estudo. Dali em diante, tudo mudou. Em 22 de março de 2024, pedi que fosse minha namorada.",
      "Por fim, em 18 de abril de 2026, em Piracaia, no interior de São Paulo, depois de um dia incrível, ajoelhei e pedi a mão dela em casamento. Eu a amo mais do que a mim mesmo.",
    ],
    signature: "Rafael",
  },
  heroImages: [
    {
      src: "/images/hero/rafael-sara-running.jpg",
      objectPosition: "center top",
    },
    {
      src: "/images/hero/rafael-sara-embrace.jpg",
      objectPosition: "center 28%",
    },
    {
      src: "/images/hero/rafael-sara-lift.jpg",
      objectPosition: "center 32%",
    },
  ],
  aboutImages: [
    {
      src: "/images/about/proposal-firepit.jpg",
      alt: "Rafael e Sara depois do pedido de casamento",
      caption: "O sim",
    },
    {
      src: "/images/about/pre-wedding-forehead-kiss.jpg",
      alt: "Rafael e Sara no ensaio pré-wedding",
      caption: "Rafael & Sara",
    },
    {
      src: "/images/about/pre-wedding-lift.jpg",
      alt: "Rafael e Sara no ensaio pré-wedding",
      caption: "Rafael & Sara",
    },
    {
      src: "/images/about/pre-wedding-indoor.jpg",
      alt: "Rafael e Sara no ensaio pré-wedding",
      caption: "Rafael & Sara",
    },
    {
      src: "/images/about/pre-wedding-stairs.jpg",
      alt: "Rafael e Sara no ensaio pré-wedding",
      caption: "Rafael & Sara",
    },
  ],
  venueImages: [
    "/images/venue/ceremony-aisle.png",
    "/images/venue/dessert-table.png",
    "/images/venue/ceremony-wide.png",
  ],
  nav: [
    { href: "#inicio", label: "Início" },
    { href: "#contador", label: "Contagem" },
    { href: "#sobre", label: "Sobre nós" },
    { href: "#presentes", label: "Presentes" },
    { href: "#local", label: "Local" },
  ],
  pix: {
    /** Exact key to copy into bank apps */
    key: "35679201895",
    typeLabel: "CPF",
    displayLabel: "356.792.018-95",
  },
} as const;
