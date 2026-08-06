import type { Metadata, Viewport } from "next";
import { Syne, Noto_Sans_TC, Instrument_Serif } from "next/font/google";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { GrainOverlay } from "@/components/ui/GrainOverlay";
import "./globals.css";

const display = Syne({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
  display: "swap",
});

const body = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-body",
  display: "swap",
});

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "嗷嗚計畫｜青蛙誰在怕｜Furmosa 匠寵",
  description:
    "青蛙從來沒嚇到狗。牠嚇到的，是你。Furmosa 匠寵嗷嗚計畫——寫給每位台灣飼主的互動故事。",
  openGraph: {
    title: "嗷嗚計畫｜青蛙誰在怕",
    description: "真正怕青蛙的，一直都是主人。",
    type: "website",
    locale: "zh_TW",
  },
};

export const viewport: Viewport = {
  themeColor: "#12081c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-Hant"
      className={`${display.variable} ${body.variable} ${serif.variable}`}
    >
      <body className="min-h-dvh bg-ink text-fog antialiased">
        <SmoothScroll>
          <GrainOverlay />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
