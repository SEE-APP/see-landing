import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { hasLocale, locales, siteUrl } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = await getDictionary(lang);

  return {
    metadataBase: new URL(siteUrl),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: {
        ...Object.fromEntries(locales.map((locale) => [locale, `/${locale}`])),
        "x-default": "/",
      },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      locale: lang,
      type: "website",
    },
    icons: {
      icon: "/logo.png",
      shortcut: "/logo.png",
      apple: "/logo.png",
    },
  };
}

export const viewport: Viewport = {
  viewportFit: "cover",
  themeColor: "#0f172a",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="flex min-h-dvh flex-col bg-dark-500 text-slate-50 antialiased selection:bg-primary-500/30">
        <Navbar lang={lang} t={dict.nav} />
        <main className="flex-1">{children}</main>
        <Footer lang={lang} nav={dict.nav.links} t={dict.footer} />
      </body>
    </html>
  );
}
