import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import FloatingChat from "@/components/FloatingChat";
import ContactFAB from "@/components/ContactFAB";
import CustomCursor from "@/components/CustomCursor";
import ScrollProgress from "@/components/ScrollProgress";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-inter",
  display: 'swap',
  preload: true
});
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk",
  display: 'swap',
  preload: true
});

export const metadata: Metadata = {
  metadataBase: new URL("https://hritiksingh1611.github.io/portfolio"),
  title: "Hritik Singh | Data Engineer Portfolio & Architecture",
  description: "Data Engineer with 3+ years experience designing scalable ETL/ELT data pipelines, AWS Glue, PySpark, Redshift, AWS DMS CDC workflows, and GCP Cloud Data Platforms.",
  keywords: ["Data Engineer", "ETL", "ELT", "AWS Glue", "PySpark", "Amazon Redshift", "AWS DMS", "CDC", "GCP BigQuery", "Python", "SQL", "Apache Airflow"],
  authors: [{ name: "Hritik Singh" }],
  creator: "Hritik Singh",
  publisher: "Hritik Singh",
  robots: "index, follow",
  openGraph: {
    title: "Hritik Singh | Data Engineer Portfolio",
    description: "Data Engineer with 3+ years experience building scalable ETL pipelines across AWS & GCP.",
    url: "https://hritiksingh1611.github.io/portfolio/",
    siteName: "Hritik Singh Portfolio",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Hritik Singh Data Engineer Portfolio Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hritik Singh | Data Engineer Portfolio",
    description: "Data Engineer with 3+ years experience building scalable ETL pipelines across AWS & GCP.",
    images: ["/og-image.svg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
      { url: "/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
    ],
    apple: { url: "/apple-icon.svg", sizes: "180x180", type: "image/svg+xml" },
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased isolate`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          <ScrollProgress />
          <CustomCursor />
          {children}
          <Analytics />
          <FloatingChat />
          <ContactFAB />
        </ThemeProvider>
      </body>
    </html>
  );
}
