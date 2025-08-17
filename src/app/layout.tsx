import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"], 
  variable: "--font-space-grotesk" 
});

export const metadata: Metadata = {
  title: "Hritik Singh - Data Engineer & AI Enthusiast",
  description: "Portfolio of Hritik Singh, a passionate Data Engineer specializing in AI/ML, data pipelines, and modern web technologies.",
  keywords: ["Data Engineer", "AI", "Machine Learning", "Python", "React", "Next.js"],
  authors: [{ name: "Hritik Singh" }],
  openGraph: {
    title: "Hritik Singh - Data Engineer & AI Enthusiast",
    description: "Portfolio of Hritik Singh, a passionate Data Engineer specializing in AI/ML, data pipelines, and modern web technologies.",
    type: "website",
  },
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
        </ThemeProvider>
      </body>
    </html>
  );
}
