import { Text } from "@/components/ui/text";

export function Home() {
  return (
    <main className='flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center'>
      <Text tone='neon'>FULL STACK DEVELOPER</Text>
      <Text tone='title' variant='h1'>
        EU TRANSFORMO IDEIAS EM PRODUTOS QUE RODAM.
      </Text>
      <Text>Thiago Morato</Text>
    </main>
  );
}
