import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import PerformanceMonitor from "@/components/PerformanceMonitor";

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
  title: "Hritik Singh | Data Engineer Portfolio",
  description: "Passionate Data Engineer specializing in scalable data pipelines, ML solutions, and transforming raw data into actionable insights. Expert in Python, cloud platforms, and distributed systems.",
  keywords: ["Data Engineer", "ETL", "Data Pipeline", "Machine Learning", "Python", "Apache Kafka", "AWS", "Apache Spark", "PostgreSQL", "Docker"],
  authors: [{ name: "Hritik Singh" }],
  creator: "Hritik Singh",
  publisher: "Hritik Singh",
  robots: "index, follow",
  openGraph: {
    title: "Hritik Singh | Data Engineer Portfolio",
    description: "Passionate Data Engineer specializing in scalable data pipelines, ML solutions, and transforming raw data into actionable insights.",
    type: "website",
    locale: "en_US",
    siteName: "Hritik Singh Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hritik Singh | Data Engineer Portfolio",
    description: "Passionate Data Engineer specializing in scalable data pipelines, ML solutions, and transforming raw data into actionable insights.",
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
    ],
    apple: { url: '/apple-icon.svg', sizes: '180x180', type: 'image/svg+xml' },
    shortcut: '/favicon.svg',
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
        className={`${inter.variable} ${spaceGrotesk.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Analytics />
          <PerformanceMonitor />
        </ThemeProvider>
      </body>
    </html>
  );
}
