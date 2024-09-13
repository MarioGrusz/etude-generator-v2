import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import "./styles/reset.scss";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Etude Generator",
  description: "Developed by Mario",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={GeistSans.className}>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
