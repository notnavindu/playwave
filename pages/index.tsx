import { useSession, signIn, signOut } from "next-auth/react";
import { getToken } from "next-auth/jwt";
import { useEffect } from "react";
import { getUserQueue } from "lib/lib/utils/spotify.util";

export default function CamperVanPage() {
  const { data: session, status } = useSession();
  const userEmail = session?.user?.email;
  // const test = getToken({});

  useEffect(() => {
    console.log("UEE");

    if (session) {
      console.log("session", session.accessToken);
    }
  }, [session]);

  if (status === "loading") {
    return <p>Hang on there...</p>;
  }

  if (status === "authenticated") {
    return (
      <>
        <p>Signed in as {userEmail}</p>
        <button onClick={() => signOut()}>Sign out</button>
      </>
    );
  }

  return (
    <>
      <p>Not signed in.</p>
      <button onClick={() => signIn("spotify")}>Sign in</button>
    </>
  );
}
