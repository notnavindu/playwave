import Layout from "lib/components/Layout";
import { SessionProvider } from "next-auth/react";
import { Manrope } from "next/font/google";
import "./globals.css";

const manrope = Manrope({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <Layout className={manrope.className}>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
