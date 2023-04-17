import Layout from "lib/components/Layout";
import { SessionProvider } from "next-auth/react";
import { Manrope } from "next/font/google";
import "./globals.css";
import Head from "next/head";

const manrope = Manrope({ subsets: ["latin"] });

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: any) {
  return (
    <SessionProvider session={session}>
      <Layout className={manrope.className}>
        <Head>
          <title>Playwave</title>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
