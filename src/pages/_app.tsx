import "@/styles/globals.css";
import type { AppProps } from "next/app";
import type { Metadata } from "next";

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.ico",
  },
  title: "donation",
  description: "...",
};

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
