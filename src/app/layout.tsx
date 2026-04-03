import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "材料详情页原型",
  description: "基于参考截图重建的材料详情页原型工程"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-screen bg-[#f8fafc]">
        <main className="container mx-auto px-4 py-6">
          {children}
        </main>
      </body>
    </html>
  );
}
