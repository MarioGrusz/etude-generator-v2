import { type Metadata } from "next";
import "./styles/reset.scss";
import "./styles/global.scss";

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
      <body>
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
