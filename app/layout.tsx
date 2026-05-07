import type { Metadata } from "next";
import { LayoutChrome } from "@/components/site/LayoutChrome";
import { readSiteData } from "@/lib/site-data";
import "./globals.css";

export const metadata: Metadata = {
  title: "EduLab CMS Starter",
  description: "A JSON-driven lab website starter with a lightweight admin CMS.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const data = await readSiteData();

  return (
    <html lang="zh-CN">
      <body>
        <LayoutChrome
          adminLabel={data.settings.adminLabel}
          footerNote={data.settings.footerNote}
          labName={data.settings.labName}
          navigation={data.navigation}
          shortName={data.settings.shortName}
        >
          {children}
        </LayoutChrome>
      </body>
    </html>
  );
}
