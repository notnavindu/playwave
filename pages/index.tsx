import { useSession, signIn, signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useEffect } from "react";
// import { getUserQueue } from "lib/lib/utils/spotify.util";
import axios from "axios";
import { usePlayer } from "lib/hooks/usePlayer";
import Home from "lib/components/Home";
import LoginPage from "lib/components/auth/LoginPage";

export default function CamperVanPage() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;

  useEffect(() => {
    if (session?.error === "RefreshAccessTokenError") {
      signIn(); // Force sign in to hopefully resolve error
    }
  }, [session]);

  if (status === "loading") {
    return <p>Hang on there...</p>;
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
