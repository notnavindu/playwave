import { usePlayerStore } from "lib/stores/usePlayerStore";
import { changePlayState } from "lib/utils/spotify.util";
import { useSession } from "next-auth/react";
import React from "react";

import { BsFillPlayCircleFill } from "react-icons/bs";
import { HiPause, HiPlay } from "react-icons/hi";

type Props = {};

const MusicControls = (props: Props) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);

  const [play, pause] = usePlayerStore((state) => [state.play, state.pause]);

  const { data: session } = useSession();

  return (
    <div className="w-full flex items-center justify-center">
      {isPlaying ? (
        <HiPause
          color={"#ffffff"}
          size={46}
          className="opacity-50"
          onClick={() => pause(session?.user.accessToken!)}
        />
      ) : (
        <HiPlay
          color={"#ffffff"}
          size={46}
          className="opacity-50"
          onClick={() => play(session?.user.accessToken!)}
        />
      )}
    </div>
  );
};

export default MusicControls;
