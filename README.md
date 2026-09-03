# portfolio-2.0

Portfólio pessoal de Thiago Morato.

## Stack

- **Vite 8** + **React 19** + **TypeScript**
- **React Router v7** (`react-router-dom`) em modo _library_ / SPA (`createBrowserRouter`)
- **Tailwind CSS v4** (`@tailwindcss/vite`), configuração CSS-first via `@theme` em `src/index.css`
- **shadcn/ui** (`components.json` já configurado) + **lucide-react** para ícones
- **oxlint** para lint (`npm run lint`)

## Design tokens

Definidos em [`src/index.css`](src/index.css):

| Token         | Valor                     | Uso              |
| ------------- | ------------------------- | ---------------- |
| `--primary`   | `oklch(0.68 0.23 305)`    | roxo elétrico    |
| `--accent`    | `oklch(0.82 0.16 195)`    | ciano neon       |
| `--background`| `oklch(0.16 0.035 265)`   | azul quase preto |

Fontes (carregadas via Google Fonts em [`index.html`](index.html)):

- **Orbitron** → utilitário `font-title` (títulos)
- **Rajdhani** → utilitário `font-body` (textos, é o `body` padrão)

## Scripts

```bash
npm run dev      # servidor de desenvolvimento
npm run build    # type-check + build de produção
npm run preview  # pré-visualiza o build
npm run lint     # oxlint
```

## Adicionar componentes shadcn/ui

```bash
npx shadcn@latest add button
```
