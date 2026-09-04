import { Text } from "@/components/ui/text";
import { m } from "@/paraglide/messages";

export function Home() {
  return (
    <main className='flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center'>
      <Text tone='neon'>{m["home.eyebrow"]()}</Text>
      <Text tone='title' variant='h1'>
        {m["home.headline"]()}
      </Text>
      <Text>{m["home.name"]()}</Text>
    </main>
  );
}
