"use client";

import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, BookOpen, Menu, X } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const t = useTranslations("Home");
  const locale = useLocale();
  const pathname = usePathname();
  const isHome = pathname === "/";
  const sectionHref = (id: string) => isHome ? `#${id}` : `/#${id}`;
  const [open, setOpen] = useState(false);
  const languageSwitch = (
    <Link href={pathname} locale={locale === "en" ? "ar" : "en"} lang={locale === "en" ? "ar" : "en"} hrefLang={locale === "en" ? "ar" : "en"} aria-label={t("language")} className="language-link">
      {locale === "en" ? "العربية" : "English"}
    </Link>
  );

  return (
    <header className="site-header">
      <div className="page-container flex min-h-25 items-center justify-between gap-5">
        <Link href="/" className="brand" aria-label={`${t("brand")} — ${t("home")}`}>
          <BookOpen className="size-9 text-primary" strokeWidth={1.15} aria-hidden="true" />
          <span><span className="brand-name">{t("brand")}<span className="text-primary">.</span></span><span className="brand-line">{t("brandLine")}</span></span>
        </Link>
        <nav aria-label={t("navigation")} className="hidden items-center gap-9 md:flex">
          <Link href="/" aria-current={isHome ? "page" : undefined} className={cn("nav-link", isHome && "nav-link-active")}>{t("home")}</Link>
          <Link href={sectionHref("work")} className={cn("nav-link", !isHome && "nav-link-active")}>{t("stories")}</Link>
          <Link href={sectionHref("about")} className="nav-link">{t("about")}</Link>
        </nav>
        <div className="hidden items-center gap-6 md:flex">
          {languageSwitch}
          <Link href={sectionHref("work")} className={cn(buttonVariants({ variant: "outline" }), "header-cta h-11 rounded-sm border-primary/50 px-5 text-primary")}>
            {t("enter")}<ArrowUpRight className="ms-2 size-4 rtl:-scale-x-100" aria-hidden="true" />
          </Link>
        </div>
        <div className="flex items-center gap-3 md:hidden">
          {languageSwitch}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" className="size-11" aria-label={t("menu")} />}><Menu aria-hidden="true" /></SheetTrigger>
            <SheetContent side={locale === "ar" ? "left" : "right"} showCloseButton={false} className="border-primary/25 p-6">
              <SheetClose render={<Button variant="ghost" size="icon" className="absolute end-3 top-3 size-11" aria-label={t("close")} />}><X aria-hidden="true" /></SheetClose>
              <SheetHeader className="px-0 pt-10">
                <SheetTitle className="font-display text-4xl text-primary">{t("brand")}.</SheetTitle>
                <SheetDescription>{t("brandLine")}</SheetDescription>
              </SheetHeader>
              <nav aria-label={t("navigation")} className="flex flex-col items-start gap-5 border-t border-border pt-6">
                <Link href="/" className="nav-link" onClick={() => setOpen(false)}>{t("home")}</Link>
                <Link href={sectionHref("work")} className="nav-link" onClick={() => setOpen(false)}>{t("stories")}</Link>
                <Link href={sectionHref("about")} className="nav-link" onClick={() => setOpen(false)}>{t("about")}</Link>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
