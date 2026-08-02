import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Noto_Sans_TC } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "./globals.css";

const display = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "嗷嗚計畫｜青蛙誰在怕｜Furmosa 匠寵",
  description:
    "有人說草叢裡有青蛙。沒有人抓到過。Will yours? Furmosa 匠寵嗷嗚計畫——把狗看見青蛙的本能，變成社區遊戲。",
  openGraph: {
    title: "嗷嗚計畫｜青蛙誰在怕",
    description: "Who's afraid of the frog? 狗才是主角。青蛙只是謎。",
    type: "website",
    locale: "zh_TW",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a1a12",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant" className={`${display.variable} ${body.variable}`}>
      <body className="min-h-dvh bg-forest-night text-cream-ink antialiased">
        <SmoothScroll>
          <GrainOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
