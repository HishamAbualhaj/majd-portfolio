import Image from "next/image";
import { Sparkles } from "lucide-react";
import { getTranslations } from "next-intl/server";
import type { Work } from "@/content/works";

export async function BookCover({ work }: { work: Work }) {
  const t = await getTranslations("Works");
  const home = await getTranslations("Home");

  return (
    <div className="book-cover-wrap">
      {work.coverSrc ? (
        <div className="book-jacket book-jacket-image">
          <Image src={work.coverSrc} alt={t("coverAlt", { title: work.title })} fill sizes="(max-width: 767px) 65vw, 300px" className="object-cover" />
        </div>
      ) : (
        <div className="book-jacket" role="img" aria-label={t("coverPlaceholderFor", { title: work.title })}>
          <div className="book-jacket-inner" aria-hidden="true">
            <span className="book-jacket-kind">{t(work.kind)}</span>
            <span className="book-jacket-title" lang="en" dir="ltr">{work.title}</span>
            <div className="book-jacket-art"><span /><Sparkles strokeWidth={0.8} /></div>
            <span className="book-jacket-author">{home("brand")}</span>
          </div>
        </div>
      )}
      {!work.coverSrc && <p className="cover-placeholder-label">{t("coverPlaceholder")}</p>}
    </div>
  );
}
