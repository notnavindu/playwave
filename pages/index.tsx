import Home from "lib/components/Home";
import LoginPage from "lib/components/auth/LoginPage";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function Index() {
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  if (status === "loading") {
    return <p>Hol up...</p>;
  }

  if (status === "authenticated") {
    return (
      <>
        <Home />
      </>
    );
  }

  return (
    <>
      <LoginPage />
    </>
  );
}
