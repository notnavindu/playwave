import { signOut, useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { usePlayerStore } from "../stores/usePlayerStore";
import { getCurrentlyPlaying } from "../utils/spotify.util";
import { shallow } from "zustand/shallow";

type Props = {};

function Home({}: Props) {
  const { data: session } = useSession();

  const { item, setItem } = usePlayerStore((state) => ({
    item: state.item,
    setItem: state.setItem,
  }));

  const userEmail = session?.user?.email;

  // const test = usePlayer(session?.user?.accessToken as string);

  // useEffect(() => {
  //   if (session?.user?.accessToken) {
  //     // getPlayerState(session?.user?.accessToken).then((test) => {
  //     //   setIte
  //     // });

  //     getCurrentlyPlaying(session?.user.accessToken).then(({ data }) => {
  //       console.log("Playi8ng: ", data);
  //       setItem(data?.item);
  //     });
  //   }
  // }, [session]);

  return (
    <div>
      <p>Signed in as {userEmail}</p>
      <p>{session?.user?.accessToken}</p>
      <br />
      {/* {JSON.stringify(test.user)} */}
      Playing: {item?.name}
      <button onClick={() => signOut()}>Sign out</button>
    </div>
  );
}

export default Home;
