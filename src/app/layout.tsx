import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "@/lib/providers";
import Navigation from "@/components/Navigation";
import { sidebarNavItems } from "@/lib/constants";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog Posts",
  description: "Create or Edit Blogs",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen bg-gray-100`}>
        <Providers>
          <aside className="w-64 bg-blue-900 text-white hidden md:block">
            <div className="p-6 text-xl font-bold">Blogs</div>
            <Navigation navList={sidebarNavItems} />
          </aside>

          <main className="flex-1 p-6">
            <div>{children}</div>
          </main>
        </Providers>
      </body>
    </html>
  );
}
