import { useSession, signIn, signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useEffect } from "react";
// import { getUserQueue } from "lib/lib/utils/spotify.util";
import axios from "axios";
import { usePlayer } from "lib/hooks/usePlayer";
import Home from "lib/components/Home";
import LoginPage from "lib/components/auth/LoginPage";

export default function Index() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // @ts-ignore
    if (session?.expired) {
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
