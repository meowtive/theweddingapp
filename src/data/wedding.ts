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
    title: "Um capítulo escrito a quatro mãos",
    body: [
      "O que começou em conversas simples virou o melhor lugar do mundo: um no outro. Com o tempo, o riso e o cuidado do dia a dia se tornaram a certeza de que queríamos caminhar juntos.",
      "Acreditamos que foi Jesus quem uniu nossos caminhos e continua sendo o centro da nossa história. É Nele que firmamos este compromisso de amar, servir e crescer lado a lado.",
      "No dia 13 de dezembro de 2026, às 15h, celebramos esse sim cercados de quem amamos. Sua presença é o nosso maior presente.",
    ],
    signature: "Com amor,",
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
