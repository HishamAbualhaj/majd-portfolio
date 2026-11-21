import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowLeft, Feather } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { getWork, works } from "@/content/works";
import { BookCover } from "@/components/book-cover";
import { PurchaseLinks } from "@/components/purchase-links";
import { SiteHeader } from "@/components/site-header";

export const dynamicParams = false;

export function generateStaticParams() {
  return works.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps<"/[locale]/work/[slug]">): Promise<Metadata> {
  const { locale, slug } = await params;
  const work = getWork(slug);
  if (!hasLocale(routing.locales, locale) || !work) notFound();
  const t = await getTranslations({ locale, namespace: "Works" });
  return { title: t("pageTitle", { title: work.title }), description: t(`${work.descriptionKey}.shortDescription`) };
}

export default async function WorkPage({ params }: PageProps<"/[locale]/work/[slug]">) {
  const { locale, slug } = await params;
  const work = getWork(slug);
  if (!hasLocale(routing.locales, locale) || !work) notFound();
  const [t, home] = await Promise.all([getTranslations("Works"), getTranslations("Home")]);

  return (
    <>
      <a href="#main-content" className="skip-link">{home("skip")}</a>
      <SiteHeader />
      <main id="main-content" className="page-container work-detail">
        <Link href="/#work" className="text-link mb-12"><ArrowLeft size={16} className="rtl:-scale-x-100" aria-hidden="true" />{t("back")}</Link>
        <div className="work-detail-layout">
          <div className="work-detail-art"><BookCover work={work} /></div>
          <div className="work-detail-copy">
            <p className="eyebrow section-eyebrow">{t("byMajd")}<span className="mx-3 text-primary/40" aria-hidden="true">/</span>{t(work.kind)}</p>
            <h1 className="work-detail-title"><bdi lang="en">{work.title}</bdi></h1>
            <p className="section-description">{t(`${work.descriptionKey}.description`)}</p>
            <div className="work-facts"><span>{t("author")}<strong>{home("brand")}</strong></span><span>{t("category")}<strong>{t(work.kind)}</strong></span></div>
            <PurchaseLinks work={work} />
            <div className="work-detail-note"><Feather size={20} strokeWidth={1} aria-hidden="true" /><p>{t("detailsPending")}</p></div>
          </div>
        </div>
      </main>
    </>
  );
}
