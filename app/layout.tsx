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
          "h-screen w-screen overflow-hidden bg-background text-foreground font-sans antialiased",
          fontSans.className,
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex h-full w-full overflow-hidden">
            <SidebarNavRail />

            <div className="flex-1 w-full md:pl-[64px] p-1.5 sm:p-2 md:p-2.5 flex flex-col h-full min-w-0 overflow-hidden">
              <div className="flex-1 w-full flex flex-col min-w-0 rounded-xl sm:rounded-2xl md:rounded-[28px] overflow-hidden shadow-sm border border-border">
                <AppBanner />

                <div className="flex-1 w-full flex flex-col min-w-0 overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                  <main className="flex-1 w-full flex flex-col min-w-0">
                    <Surface
                      className="flex-1 w-full flex flex-col min-w-0 min-h-full"
                      variant="secondary"
                    >
                      {children}
                    </Surface>
                  </main>
                </div>
              </div>
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
