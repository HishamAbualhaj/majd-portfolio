import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowRight, BookOpen, Feather, Sparkles } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export async function HomeHero() {
  const t = await getTranslations("Home");
  const themes = [
    { label: "childrenLabel", title: "childrenTitle", description: "childrenDescription", Icon: Sparkles },
    { label: "novelsLabel", title: "novelsTitle", description: "novelsDescription", Icon: Feather },
    { label: "booksLabel", title: "booksTitle", description: "booksDescription", Icon: BookOpen },
  ] as const;

  return (
    <>
      <section className="page-container hero" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="eyebrow hero-eyebrow" data-reveal><span className="h-px w-8 bg-primary/65" />{t("eyebrow")}</p>
          <h1 id="hero-title" className="hero-title" data-reveal data-reveal-delay="70">{t("heading")}<br /><em>{t("headingAccent")}</em></h1>
          <p className="hero-intro" data-reveal data-reveal-delay="130">{t("intro")}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-3" data-reveal data-reveal-delay="190">
            <a href="#work" className={cn(buttonVariants(), "hero-cta h-13 gap-5 rounded-sm px-6")}>{t("explore")}<ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden="true" /></a>
            <a href="#about" className="text-link min-h-12">{t("aboutCta")}</a>
          </div>
          <div className="hero-footnote" data-reveal data-reveal-delay="230"><Feather className="size-5 text-primary/75" strokeWidth={1.2} aria-hidden="true" /><span>{t("footnote")}</span></div>
        </div>
        <figure className="library-figure">
          <div className="library-frame" data-reveal data-reveal-delay="100">
            <Image src="/images/library.jpg" alt={t("imageAlt")} fill priority sizes="(max-width: 767px) 90vw, 44vw" className="library-image" />
            <div className="library-shade" />
            <div className="library-inner-border" />
            <figcaption className="library-caption"><span className="eyebrow">{t("imageCaption")}</span><span className="font-display text-3xl italic">{t("imageNote")}</span></figcaption>
          </div>
          <div className="story-seal" aria-hidden="true"><span>{t("sealTop")}</span><BookOpen size={27} strokeWidth={1} /><span>{t("sealBottom")}</span></div>
          <a href="#work" className="hero-story-note" data-reveal data-reveal-delay="180">
            <span className="animated-book" aria-hidden="true"><span className="book-page book-page-left" /><span className="book-page book-page-right" /><span className="book-page book-page-turn" /></span>
            <span><span className="hero-note-title">{t("motionTitle")}</span><span className="hero-note-description">{t("motionDescription")}</span></span>
            <ArrowRight size={16} className="rtl:-scale-x-100" aria-hidden="true" />
          </a>
          <span className="frame-star" aria-hidden="true">✦</span>
        </figure>
      </section>
      <section className="stories-section" aria-labelledby="stories-title">
        <div className="page-container">
          <div className="stories-heading" data-reveal><p className="eyebrow">{t("chapter")}</p><h2 id="stories-title" className="font-display text-3xl sm:text-4xl">{t("collectionTitle")}</h2><span className="hidden h-px flex-1 bg-border lg:block" /></div>
          <div className="story-grid">
            {themes.map(({ label, title, description, Icon }, index) => (
              <article key={label} className="story-category" data-reveal data-reveal-delay={index * 90}>
                <Icon className="mb-5 size-6 text-primary" strokeWidth={1.2} aria-hidden="true" />
                <p className="eyebrow text-[10px]">{t(label)}</p>
                <h3 className="mb-2 mt-2 font-display text-3xl">{t(title)}</h3>
                <p className="max-w-80 text-sm leading-7 text-muted-foreground">{t(description)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
