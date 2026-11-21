import { getTranslations } from "next-intl/server";
import { works } from "@/content/works";
import { BookCard } from "@/components/book-card";

export async function HomeWork() {
  const t = await getTranslations("Works");
  return (
    <section id="work" className="landing-section work-section" aria-labelledby="work-title">
      <div className="page-container work-layout">
        <div className="section-introduction" data-reveal>
          <p className="eyebrow section-eyebrow">{t("eyebrow")}</p>
          <h2 id="work-title" className="section-title">{t("heading")}<br /><em>{t("headingAccent")}</em></h2>
          <p className="section-description">{t("introduction")}</p>
          <span className="section-rule" aria-hidden="true" />
          <p className="text-sm leading-7 text-muted-foreground">{t("moreSoon")}</p>
        </div>
        <div className="work-list" data-reveal data-reveal-delay="120">{works.map((work) => <BookCard key={work.slug} work={work} />)}</div>
      </div>
    </section>
  );
}
