import { Feather } from "lucide-react";
import { getTranslations } from "next-intl/server";

export async function HomeQuote() {
  const t = await getTranslations("Quote");
  return (
    <section id="quote" className="quote-section" aria-labelledby="quote-title">
      <figure className="page-container quote-content" data-reveal>
        <div className="quote-ornament" aria-hidden="true"><span /><Feather size={22} strokeWidth={1} /><span /></div>
        <h2 id="quote-title" className="eyebrow">{t("eyebrow")}</h2>
        <blockquote><p>{t("lineOne")}<br /><em>{t("lineTwo")}</em></p></blockquote>
        <figcaption>{t("placeholder")}</figcaption>
      </figure>
    </section>
  );
}
