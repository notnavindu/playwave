import { ReactNode } from "react";
import Script from "next/script";

type Props = {
  children: ReactNode;
  className?: string;
};

function Layout({ children, className = "" }: Props) {
  return (
    <main
      className={`w-full min-h-screen bg-black text-white antialiased ${className}`}
    >
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-PYJL53E8H2"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
        
          gtag('config', 'G-PYJL53E8H2');
        `}
      </Script>

      {children}
    </main>
  );
}

export default Layout;
