import { getTranslations } from "next-intl/server";
import { author } from "@/content/author";

const platforms = [
  { key: "instagram", label: "Instagram" },
  { key: "whatsapp", label: "WhatsApp" },
  { key: "facebook", label: "Facebook" },
] as const;

export async function SocialLinks() {
  const t = await getTranslations("About");
  const hasPending = platforms.some(({ key }) => !author.socials[key]);

  return (
    <div className="author-socials">
      <ul className="social-links" aria-label={t("socials")}>
        {platforms.map(({ key, label }) => {
          const href = author.socials[key];
          const icon = <span className={`social-icon social-icon-${key}`} aria-hidden="true" />;
          return (
            <li key={key}>
              {href ? (
                <a className="social-link" href={href} target="_blank" rel="noopener noreferrer" aria-label={t("socialLabel", { platform: label })} title={label}>
                  {icon}
                </a>
              ) : (
                <button className="social-link" type="button" disabled aria-label={t("socialPendingLabel", { platform: label })} title={t("socialPendingLabel", { platform: label })}>
                  {icon}
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {hasPending && <p className="social-links-note">{t("socialPending")}</p>}
    </div>
  );
}
