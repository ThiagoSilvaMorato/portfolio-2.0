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

## Chatbot (`/chat`)

A tela `/chat` conversa com uma IA gratuita (OpenRouter) que só responde com base
numa base de conhecimento sobre o Thiago. Roda como **Vercel Function** — a API key
nunca chega no navegador.

```
api/
  chat.ts              POST /api/chat  (único endpoint)
  _lib/                config, retrieval (Tier 1 por palavra-chave), prompt, cliente OpenRouter
  _knowledge/          en.json / pt-BR.json  ← os fatos sobre o Thiago (mesmos id/topic nas 2 línguas)
```

Fluxo: `retrieve()` pontua os chunks por palavra-chave; se nada passa de `MIN_SCORE`
(gate de confiança), responde "não tenho informação suficiente" **sem chamar a IA**.
Se passa, monta o prompt com os chunks relevantes + os marcados `always` e chama o
modelo, que é instruído a devolver `NO_MATCH` se o contexto não responder.

### Variáveis de ambiente

Copie `.env.example` para `.env.local` (ignorado pelo Git) e preencha. Em produção,
configure as mesmas no painel da Vercel. **Nunca** use prefixo `VITE_` nelas.

| Var | Obrigatória | Uso |
| --- | --- | --- |
| `OPENROUTER_API_KEY` | sim | key de <https://openrouter.ai/keys> |
| `OPENROUTER_MODEL` | não | id de modelo `:free`; fallback no código |
| `OPENROUTER_SITE_URL` / `OPENROUTER_SITE_NAME` | não | atribuição no OpenRouter |
| `ALLOWED_ORIGIN` | não | trava `/api/chat` no seu domínio |

### Rodar localmente

`npm run dev` já serve o endpoint `/api/chat` — um plugin em [`vite.config.ts`](vite.config.ts)
(`devApi`) roda a function `api/chat.ts` dentro do dev server do Vite, lendo o `.env.local`.
Não precisa de `vercel dev` para desenvolver. Erros da IA aparecem no terminal do Vite
(`[dev-api]` / `OpenRouter <status> ...`). Editou algo em `api/`? O Vite recarrega sozinho.

Em produção quem serve `/api/chat` é a Vercel Function real; o plugin só roda em `serve`.

