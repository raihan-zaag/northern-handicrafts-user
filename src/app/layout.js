import { Syne } from "next/font/google";
import "./globals.css";

import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider } from "antd";

import HeaderComponent from "@/components/header";
import Footer from "@/components/footer";
import { theme } from "@/configs/antd.theme";
import ContextWrapper from "@/contextProviders/contextWrapper";

const syne = Syne({
    subsets: ["latin"],
    weight: ["400", "700"],
});

export const metadata = {
    title: "Optiluxe Eyewear",
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
            <body className={`${syne.className} antialiased`}>
                <AntdRegistry>
                    <ConfigProvider theme={theme}>
                        <ContextWrapper>
                            <HeaderComponent />
                            {children}
                            <Footer />
                        </ContextWrapper>
                    </ConfigProvider>
                </AntdRegistry>
            </body>
        </html>
    );
}
