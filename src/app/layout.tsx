import { type Metadata } from "next";
import "./styles/reset.scss";
import "./styles/global.scss";

import { TRPCReactProvider } from "~/trpc/react";
import { DataProvider } from "./context/DataContext";

export const metadata: Metadata = {
  title: "Etude Generator",
  description:
    "Developed by Adam & Mario, Etude Generator helps animation students to come up with ideas.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", url: "//favicon-32x32.png" },
    { rel: "icon", url: "//favicon-16x16.png" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
  openGraph: {
    title: "Etude Generator",
    description:
      "Developed by Adam & Mario, Etude Generator helps animation students to come up with ideas.",
    url: "https://yourwebsite.com",
    //images: [{ url: "https://yourwebsite.com/social-image.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Etude Generator",
    description:
      "Developed by Adam & Mario, Etude Generator helps animation students to come up with ideas.",
    //images: ["https://yourwebsite.com/social-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <TRPCReactProvider>
          <DataProvider>{children}</DataProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
