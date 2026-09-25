import type { Metadata } from "next";
import { IBM_Plex_Mono } from "next/font/google";
import "@/styles/globals.css";

const ibm_plex_mono = IBM_Plex_Mono({
    variable: "--font-ibm-plex-mono",
    weight: ["400", "500"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Nikhil Thorat | Portfolio",
    description: "Software Developer, based in India.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${ibm_plex_mono.className} antialiased`}
            >
                {children}
            </body>
        </html>
    );
}
