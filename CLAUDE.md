# CLAUDE.md

Boas práticas obrigatórias para este projeto (React 19 + Vite + TS + Tailwind v4 + shadcn/ui).

## Princípios

- **Reutilizar antes de criar.** Procure em `src/components`, `src/lib` e no shadcn (`npx shadcn@latest add`) antes de escrever algo novo.
- **Sem código duplicado.** Repetiu 2+ vezes? Vira função, hook, componente ou variante `cva`.
- **Tudo tipado, zero `any`** (nem implícito). Sem `@ts-ignore`; se inevitável, `@ts-expect-error` com motivo.
- **Manter o padrão existente.** Código novo deve parecer que sempre esteve aqui. Ao editar um arquivo, siga o estilo dele.
- **Comentários só quando necessários.** Nada de comentar o óbvio ou descrever o "o quê". Comente apenas o "porquê" não evidente (decisão, gambiarra, acoplamento). Prefira nomes claros a comentários.

## Componentes

- Padrão do `src/components/ui/text.tsx`: função nomeada (sem `forwardRef`), `data-slot`, export nomeado, 1 por arquivo.
- Variantes com `cva` — nunca montar `className` com template string. Junção de classes só via `cn()` (`@/lib/utils`).
- `ui/` = primitivos sem regra de negócio. Composições em `common/`, moldura em `layout/`, views em `pages/`. Dependência só para trás: `ui/ ← common/ ← layout/ ← pages/`.
- Componente específico de uma página fica junto da página, não em `components/`.
- Evite `!` (non-null assertion); prefira `?? padrão` ou narrowing.
- Ícones: `lucide-react` para UI; marcas em `@icons-pack/react-simple-icons` (import por subpath: `.../icons/SiX`, default export). Marca que a lib não tem (ex.: LinkedIn) vira SVG local em `src/components/ui/icons/`.
- Listas repetidas de markup (stats, links sociais…) viram array de dados + `.map`, não blocos copiados.

## Estilo

- Só utilitários Tailwind + tokens do tema (`bg-background`, `text-primary`, `text-accent`, `border-border`…).
- Nunca cor hardcoded (`#…`, `oklch(…)`) em componente — cor nova vira token em `src/index.css`.
- `font-title` (Orbitron) para títulos, `font-body` (Rajdhani) para texto. Use `<Text>` no lugar de `<h1>/<p>` soltos.

## TypeScript

- `import type` para tipos. Sem `enum` — use união de literais ou objeto `as const`.
- Derive tipos (`keyof typeof`, `VariantProps`, `Omit`) em vez de repetir.
- Tipe o público (props, retornos exportados); deixe a inferência cuidar do resto.

## Rotas

- Rota nova em `src/router.tsx`, como filha da rota de layout (`RootLayout` em `src/components/layout/`, que renderiza `<SiteNav />` + `<Outlet />`). Navegação interna com `<Link>` / `<NavLink>` / `useNavigate`, nunca `<a href>` (link externo/`mailto:` pode `<a>`).
- Metadados por página: `<Helmet>` (`react-helmet-async`); o `<HelmetProvider>` fica no `App`. `title`/`description` via `t(...)`.

## i18n (i18next + react-i18next)

- Locales: `en` (fallback) e `pt-BR`. Detecção: `localStorage → navigator` (chave `locale`), persiste no `localStorage`. Sem locale na URL.
- Config em `src/i18n/index.ts`; carregada uma vez via `import "@/i18n"` no `main.tsx`.
- **Nenhum texto visível hardcoded.** Toda string de UI vem de `t("contexto.chave")` do hook `useTranslation()` (`react-i18next`).
- Mensagens agrupadas por tela/contexto em `src/i18n/en.json` e `src/i18n/pt-BR.json` (objeto aninhado: `{ nav: {...}, home: {...}, notFound: {...} }`). Chaves das duas devem ser idênticas.
- Tipagem de `t()` vem de `src/i18n/i18next.d.ts` (augmenta `CustomTypeOptions` com base no `en.json`) — chave errada é erro de build.
- Troca de idioma: `i18n.changeLanguage(locale)` (reativo, sem reload) — ver `LangSwitch`. `<html lang>` é sincronizado no listener `languageChanged` do config.
- Datas/números/moeda sempre via `Intl.*` com `i18n.resolvedLanguage`, nunca formato fixo.

## Antes de concluir

- `npm run build` e `npm run lint` passam sem erro.
- Sem `console.log`, código morto ou import não usado.
- Mudou uma convenção? Atualize este arquivo e o `README.md`.

## Git

- Conventional Commits em pt-BR (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- Commits pequenos e focados. Respeite o `.gitignore`.
