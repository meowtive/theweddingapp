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

Nenhuma chave de pagamento é necessária — presentes usam PIX direto
(configurado em [`src/data/wedding.ts`](src/data/wedding.ts)).

| Variável | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Opcional — URL pública do site |

## Lista de presentes

Os presentes ficam em [`src/data/gifts.ts`](src/data/gifts.ts).

Quando alguém presentear via PIX (ou comprar na loja):

1. Confirme o pagamento / presente com o casal
2. Altere `presented: true` no presente correspondente
3. Faça deploy de novo

Assim o item aparece como **Já presenteado**.

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
