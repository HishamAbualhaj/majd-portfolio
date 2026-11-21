import { ArrowUpRight } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { BookCover } from "@/components/book-cover";
import type { Work } from "@/content/works";

export async function BookCard({ work }: { work: Work }) {
  const t = await getTranslations("Works");

  return (
    <article className="book-card">
      <Link href={`/work/${work.slug}`} className="book-card-link" aria-label={t("viewWork", { title: work.title })}>
        <div className="book-card-art"><BookCover work={work} /></div>
        <div className="book-card-copy">
          <span className="eyebrow">{t("featured")}<span className="mx-3 text-primary/40" aria-hidden="true">/</span>{t(work.kind)}</span>
          <h3 className="book-card-title"><bdi lang="en">{work.title}</bdi></h3>
          <p className="text-sm leading-7 text-muted-foreground">{t(`${work.descriptionKey}.shortDescription`)}</p>
          <span className="book-card-action">{t("discover")}<ArrowUpRight size={18} strokeWidth={1.3} className="rtl:-scale-x-100" aria-hidden="true" /></span>
        </div>
      </Link>
    </article>
  );
}
