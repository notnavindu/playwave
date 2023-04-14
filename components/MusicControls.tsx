import { usePlayerStore } from "lib/stores/usePlayerStore";
import {
  changePlayState,
  getCurrentlyPlaying,
  nextSong,
  previousSong,
} from "lib/utils/spotify.util";
import { useSession } from "next-auth/react";
import React from "react";

import { HiPause, HiPlay } from "react-icons/hi";
import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

type Props = {};

const MusicControls = (props: Props) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const [play, pause] = usePlayerStore((state) => [state.play, state.pause]);
  const setItem = usePlayerStore((state) => state.setItem);

  const setIsPlaying = usePlayerStore((state) => state.setIsPlaying);

  const { data: session } = useSession();

  const playNext = async () => {
    await nextSong(session?.user.accessToken!);

    getCurrentlyPlaying(session?.user.accessToken!).then(({ data }) => {
      setItem(data?.item);
      setIsPlaying(data?.is_playing);
    });
  };

  const playPrev = async () => {
    await previousSong(session?.user.accessToken!);

    getCurrentlyPlaying(session?.user.accessToken!).then(({ data }) => {
      setItem(data?.item);
      setIsPlaying(data?.is_playing);
    });
  };

  return (
    <div className="w-full flex items-center justify-center gap-3">
      <button className="w-12 h-12 flex items-center justify-center active:scale-75 transition-transform duration-500 hover:scale-110">
        <MdNavigateBefore
          onClick={playPrev}
          className="opacity-50 drop-shadow-sm"
          size={28}
        />
      </button>

      <button className="active:scale-75 transition-transform duration-500 hover:scale-110">
        {isPlaying ? (
          <HiPause
            color={"#ffffff"}
            size={72}
            className="opacity-50 drop-shadow-lg"
            onClick={() => pause(session?.user.accessToken!)}
          />
        ) : (
          <HiPlay
            color={"#ffffff"}
            size={72}
            className="opacity-50"
            onClick={() => play(session?.user.accessToken!)}
          />
        )}
      </button>

      <button className="w-12 h-12 flex items-center justify-center active:scale-75 transition-transform duration-500 hover:scale-110">
        <MdNavigateNext
          onClick={playNext}
          className="opacity-50 drop-shadow-sm"
          size={28}
        />
      </button>
    </div>
  );
};

export default MusicControls;
