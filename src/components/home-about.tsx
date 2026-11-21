import Image from "next/image";
import { ArrowRight, Feather, UserRound } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { author } from "@/content/author";
import { SocialLinks } from "@/components/social-links";

export async function HomeAbout() {
  const t = await getTranslations("About");
  const home = await getTranslations("Home");
  return (
    <section id="about" className="landing-section about-section" aria-labelledby="about-title">
      <div className="page-container about-layout">
        <figure className="author-portrait" data-reveal>
          <div className="portrait-frame">
            {author.portraitSrc ? (
              <Image src={author.portraitSrc} alt={t("portraitAlt")} fill sizes="(max-width: 767px) 85vw, 420px" className="object-cover" />
            ) : (
              <div className="portrait-placeholder">
                <UserRound size={72} strokeWidth={0.65} aria-hidden="true" />
                <span className="font-display text-3xl">{home("brand")}</span>
                <span className="text-xs tracking-wide text-muted-foreground">{t("portraitPlaceholder")}</span>
              </div>
            )}
          </div>
          <figcaption><Feather size={17} strokeWidth={1} aria-hidden="true" />{t("portraitCaption")}</figcaption>
        </figure>
        <div className="about-copy" data-reveal data-reveal-delay="120">
          <p className="eyebrow section-eyebrow">{home("aboutEyebrow")}</p>
          <h2 id="about-title" className="section-title">{home("aboutTitle")}</h2>
          <p className="about-lead font-display">{t("lead")}</p>
          <p className="section-description">{home("aboutDescription")}</p>
          <p className="section-description">{t("description")}</p>
          <div className="author-signature" aria-hidden="true">{home("brand")}<span className="text-primary">.</span></div>
          <div className="about-actions">
            <a href="#work" className="text-link">{t("explore")}<ArrowRight size={17} className="rtl:-scale-x-100" aria-hidden="true" /></a>
            <SocialLinks />
          </div>
        </div>
      </div>
    </section>
  );
}
