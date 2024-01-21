import type { Metadata } from "next";
import { Raleway, Roboto } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-raleway",
});

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["300", "400", "500", "700"],
});

export const metadata: Metadata = {
  title: "HelpMePass",
  description: "An app to help you pass your CS classes",
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${roboto.variable}`}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
