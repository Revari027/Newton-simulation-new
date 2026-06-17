import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Newton Lab",
  description: "Web edukasi dan simulasi interaktif Hukum Newton"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className="font-sf antialiased">{children}</body>
    </html>
  );
}
