import "./globals.css";
import { Inter } from "next/font/google";

const defaultUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

export const metadata = {
    metadataBase: new URL(defaultUrl),
    title: "Sundial",
    description:
        "Visualize the position of the sun on a floorplan, helping you understand sunlight exposure in your new home.",
};
const inter = Inter({
    subsets: ["latin"],
    display: "swap",
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.className}>
            <body className="bg-background text-foreground">
                <main className="min-h-screen flex flex-col items-center">
                    {children}
                </main>
            </body>
        </html>
    );
}
