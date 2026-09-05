import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { SidebarNavRail } from "@/components/sidebar-rail";
import { AppBanner } from "@/components/app-banner";
import { Surface } from "@heroui/react";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={clsx("light", fontSans.variable)}
      data-theme="light"
    >
      <head />
      <body
        suppressHydrationWarning
        className={clsx(
          "min-h-screen bg-background text-foreground font-sans antialiased",
          fontSans.className,
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex min-h-screen">
            <SidebarNavRail />

            <div className="flex-1 w-full md:pl-[64px] p-0 md:p-2 flex flex-col min-h-screen min-w-0">
              <div className="flex-1 w-full flex flex-col min-w-0 rounded-none md:rounded-2xl overflow-hidden shadow-xs">
                <AppBanner />

                <main className="flex-1 w-full flex flex-col min-w-0">
                  <Surface
                    className="flex-1 w-full flex flex-col min-w-0"
                    variant="secondary"
                  >
                    {children}
                  </Surface>
                </main>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
