import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "أكاديمية كود سبارك",
  description:
    "أكاديمية صيفية عربية تساعد الأطفال على بناء مشاريع برمجية حقيقية ومهارات جاهزة للمستقبل."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="light" dir="rtl" lang="ar">
      <body className="bg-background font-body-md text-on-surface">
        {children}
      </body>
    </html>
  );
}
