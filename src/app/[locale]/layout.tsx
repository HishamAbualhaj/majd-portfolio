import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Manrope,
  Noto_Naskh_Arabic,
} from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import "../globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-literary",
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});
const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const arabic = Noto_Naskh_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
  display: "swap",
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: LayoutProps<"/[locale]">): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "Home" });
  return { title: t("title"), description: t("description") };
}
export default async function LocaleLayout({
  children,
  params,
}: LayoutProps<"/[locale]">) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  return (
    <html
      lang={locale}
      dir={locale === "ar" ? "rtl" : "ltr"}
      className={`${display.variable} ${sans.variable} ${arabic.variable}`}
    >
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
