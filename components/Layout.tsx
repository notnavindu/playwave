import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
};

function Layout({ children, className = "" }: Props) {
  return (
    <main
      className={`w-full min-h-screen bg-black text-white antialiased ${className}`}
    >
      {children}
    </main>
  );
}

export default Layout;
