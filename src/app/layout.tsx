import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, DM_Sans } from "next/font/google";
import { SquircleProvider } from "@/components/squircle-provider";
import MotionProvider from "@/components/motion-provider";
import "@/styles/globals.css";
import ScrollUp from "@/components/scroll-up";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage-grotesque",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const SITE_URL = "https://iamnikhilthorat.vercel.app";
const SITE_NAME = "Nikhil Thorat";
const SITE_TITLE = "Nikhil Thorat | Software Engineer";
const SITE_DESCRIPTION =
  "Software engineer based in Pune, India, building backend systems, developer tools and interesting problems.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  keywords: [
    "Nikhil Thorat",
    "Software Engineer",
    "Backend Developer",
    "Go",
    "PostgreSQL",
    "Pune",
    "Portfolio",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
    images: [
      {
        url: "/og.jpg",
        width: 1200,
        height: 630,
        alt: "Nikhil Thorat — Software Engineer portfolio website",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: ["/og.jpg"],
    creator: "@iamnikhilthorat",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#f5f5f5",
  colorScheme: "light",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nikhil Thorat",
  url: SITE_URL,
  email: "mailto:work.nikhilthorat@gmail.com",
  jobTitle: "Software Engineer",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pune",
    addressCountry: "IN",
  },
  sameAs: [
    "https://github.com/nikhil-thorat",
    "https://linkedin.com/in/iamnikhilthorat",
    "https://x.com/iamnikhilthorat",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`relative ${dmSans.className} ${dmSans.variable} ${bricolageGrotesque.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <SquircleProvider>
          <MotionProvider>
            {children}
            <ScrollUp />
          </MotionProvider>
        </SquircleProvider>
      </body>
    </html>
  );
}
