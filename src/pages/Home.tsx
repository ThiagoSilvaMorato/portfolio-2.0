import { useTranslation } from "react-i18next";
import { Text } from "@/components/ui/text";

export function Home() {
  const { t } = useTranslation();

  return (
    <main className='flex min-h-svh flex-col items-center justify-center gap-4 px-6 text-center'>
      <Text tone='neon'>{t("home.eyebrow")}</Text>
      <Text tone='title' variant='h1'>
        {t("home.headline")}
      </Text>
      <Text>{t("home.name")}</Text>
    </main>
  );
}
