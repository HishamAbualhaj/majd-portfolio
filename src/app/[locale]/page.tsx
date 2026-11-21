import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";
import { SiteHeader } from "@/components/site-header";
import { HomeHero } from "@/components/home-hero";
import { HomeAbout } from "@/components/home-about";
import { HomeWork } from "@/components/home-work";
import { HomeQuote } from "@/components/home-quote";
import { ScrollAnimations } from "@/components/scroll-animations";
export default async function Home({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();

  const t = await getTranslations("Home");
  return (
    <>
      <a href="#main-content" className="skip-link">{t("skip")}</a>
      <SiteHeader />
      <main id="main-content">
        <ScrollAnimations />
        <HomeHero />
        <HomeWork />
        <HomeAbout />
        <HomeQuote />
      </main>
    </>
  );
}
