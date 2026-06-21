import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Newton Lab | Belajar Hukum Newton",
    template: "%s | Newton Lab"
  },
  description:
    "Platform pembelajaran Hukum Newton dengan materi ringkas, simulasi interaktif, dan mini quiz.",
  keywords: [
    "Hukum Newton",
    "Fisika",
    "Simulasi Fisika",
    "Edukasi",
    "Newton Lab"
  ],
  authors: [{ name: "Newton Lab" }],
  openGraph: {
    title: "Newton Lab | Belajar Hukum Newton",
    description:
      "Materi ringkas, simulasi interaktif, dan mini quiz Hukum Newton.",
    type: "website"
  }
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FDF6ED" },
    { media: "(prefers-color-scheme: dark)", color: "#131816" }
  ],
  width: "device-width",
  initialScale: 1
};

const noFlashScript = `
(function() {
  try {
    var stored = localStorage.getItem('theme');
    var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    var theme = stored || (prefersDark ? 'dark' : 'light');
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: noFlashScript }} />
      </head>
      <body className="font-sf antialiased">{children}</body>
    </html>
  );
}
