import { Inter } from "next/font/google";
import "./globals.css";

import ContextWrapper from "@/contextProviders/contextWrapper";
import { Toaster } from "sonner";

const inter = Inter({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata = {
    title: "Northern-Handicrafts",
    description: "Elevating your vision",
    icons: {
        icon: ["/favicon.ico?v=4"],
        apple: ["/apple-touch-icon.png?v=4"],
        shortcut: ["/apple-touch-icon.png"],
    },
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased`}>
                <ContextWrapper>
                    {children}
                </ContextWrapper>
                <Toaster richColors closeButton position="top-right" />
            </body>
        </html>
    );
}
