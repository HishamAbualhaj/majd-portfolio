import { getTranslations } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Home");
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center gap-6 px-6 py-16">
      <nav
        aria-label={t("language")}
        className="flex gap-4 text-sm underline underline-offset-4"
      >
        <Link href="/" locale="en" lang="en" hrefLang="en">
          English
        </Link>
        <Link href="/" locale="ar" lang="ar" hrefLang="ar">
          العربية
        </Link>
      </nav>
      <h1 className="text-4xl font-semibold">{t("title")}</h1>
      <p className="text-lg">{t("description")}</p>
    </main>
  );
}
