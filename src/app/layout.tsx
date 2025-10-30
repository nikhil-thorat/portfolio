import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "@/styles/globals.css";

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Nikhil Thorat | Portfolio",
    description: "A Machine learning engineer, based in Pune, India",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body
                className={`${geistMono.variable} antialiased font-mono`}
            >
                {children}
            </body>
        </html>
    );
}
