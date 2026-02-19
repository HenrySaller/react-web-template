import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-4 p-8">
      <h1 className="text-4xl font-bold">React Web Template</h1>
      <p className="text-muted-foreground text-center text-lg">
        Vite · TypeScript · TanStack Router · TanStack Query · Zustand · Tailwind CSS v4
      </p>
    </main>
  )
}
