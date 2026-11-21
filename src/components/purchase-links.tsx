import { ArrowUpRight, ShoppingBag } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Work } from "@/content/works";

export async function PurchaseLinks({ work }: { work: Work }) {
  const t = await getTranslations("Works");
  return (
    <div className="purchase-options">
      <div className="flex flex-wrap gap-3">
        {work.storeUrl && (
          <a href={work.storeUrl} className={cn(buttonVariants(), "h-12 gap-3 rounded-sm px-6")}><ShoppingBag size={17} aria-hidden="true" />{t("buyInStore")}</a>
        )}
        {work.amazonUrl ? (
          <a href={work.amazonUrl} target="_blank" rel="noopener noreferrer" className={cn(buttonVariants({ variant: work.storeUrl ? "outline" : "default" }), "h-12 gap-3 rounded-sm px-6")}>
            {t("buyAmazon")}<ArrowUpRight size={17} className="rtl:-scale-x-100" aria-hidden="true" /><span className="sr-only">{t("newTab")}</span>
          </a>
        ) : (
          <Button disabled variant={work.storeUrl ? "outline" : "default"} className="h-12 gap-3 rounded-sm px-6" aria-describedby="purchase-status"><ShoppingBag size={17} aria-hidden="true" />{t("buyAmazon")}</Button>
        )}
      </div>
      {!work.amazonUrl && <p id="purchase-status" className="mt-4 text-sm text-muted-foreground">{t("amazonPending")}</p>}
    </div>
  );
}
