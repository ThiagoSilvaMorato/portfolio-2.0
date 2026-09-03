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

## Estilo

- Só utilitários Tailwind + tokens do tema (`bg-background`, `text-primary`, `text-accent`, `border-border`…).
- Nunca cor hardcoded (`#…`, `oklch(…)`) em componente — cor nova vira token em `src/index.css`.
- `font-title` (Orbitron) para títulos, `font-body` (Rajdhani) para texto. Use `<Text>` no lugar de `<h1>/<p>` soltos.

## TypeScript

- `import type` para tipos. Sem `enum` — use união de literais ou objeto `as const`.
- Derive tipos (`keyof typeof`, `VariantProps`, `Omit`) em vez de repetir.
- Tipe o público (props, retornos exportados); deixe a inferência cuidar do resto.

## Rotas

- Rota nova em `src/router.tsx`. Navegação interna com `<Link>` / `useNavigate`, nunca `<a href>`.

## Antes de concluir

- `npm run build` e `npm run lint` passam sem erro.
- Sem `console.log`, código morto ou import não usado.
- Mudou uma convenção? Atualize este arquivo e o `README.md`.

## Git

- Conventional Commits em pt-BR (`feat:`, `fix:`, `chore:`, `refactor:`, `docs:`).
- Commits pequenos e focados. Respeite o `.gitignore`.
