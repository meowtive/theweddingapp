# Rafael & Sara — Wedding Site

Site de casamento em Next.js (App Router) + Tailwind CSS, em pt-BR.

## Desenvolvimento

```bash
npm install
cp .env.example .env.local
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Variáveis de ambiente

| Variável | Uso |
| --- | --- |
| `ABACATEPAY_API_KEY` | Chave secreta da Abacate Pay (server-only) |
| `NEXT_PUBLIC_SITE_URL` | URL pública do site (redirects pós-pagamento) |

Sem a chave da Abacate, a lista de presentes aparece normalmente, mas o botão fica como **Pagamento em breve**.

## Lista de presentes

Os presentes ficam em [`src/data/gifts.ts`](src/data/gifts.ts).

Quando alguém presentear via Abacate Pay:

1. Confirme o pagamento no painel da Abacate
2. Altere `presented: true` no presente correspondente
3. Faça deploy de novo

Assim o item aparece como **Já presenteado** e não pode ser comprado duas vezes.

## Conteúdo editável

- Nomes, data, local e textos: [`src/data/wedding.ts`](src/data/wedding.ts)
- Música: [`public/theme.mp3`](public/theme.mp3)

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```
