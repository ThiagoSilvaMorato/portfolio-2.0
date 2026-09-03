import { Link } from 'react-router-dom'

export function NotFound() {
  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center">
      <h1 className="font-title text-5xl font-bold tracking-[0.15em] text-primary uppercase">
        404
      </h1>
      <p className="font-body text-xl font-medium tracking-wide text-muted-foreground">
        Página não encontrada
      </p>
      <Link
        to="/"
        className="font-body text-lg font-semibold tracking-wide text-accent underline-offset-4 hover:underline"
      >
        Voltar ao início
      </Link>
    </main>
  )
}
