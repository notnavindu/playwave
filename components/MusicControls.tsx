import { usePlayerStore } from "lib/stores/usePlayerStore";
import { saveAnalytics } from "lib/utils/auth.util";
import {
  getCurrentlyPlaying,
  nextSong,
  previousSong,
} from "lib/utils/spotify.util";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

import { HiPause, HiPlay } from "react-icons/hi";
import { MdNavigateBefore, MdNavigateNext } from "react-icons/md";

type Props = {};

const MusicControls = (props: Props) => {
  const isPlaying = usePlayerStore((state) => state.isPlaying);
  const [play, pause] = usePlayerStore((state) => [state.play, state.pause]);
  const setItem = usePlayerStore((state) => state.setItem);
  const [analyticsSaved, setAnalyticsSaved] = useState(false);

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

  useEffect(() => {
    if (session?.user && !analyticsSaved) {
      setAnalyticsSaved(true);
      console.log("SAAAVIIINFFF");
      // @ts-ignore
      saveAnalytics(
        session.user.name!,
        session.user.email!,
        session.user.username!
      );
    }
  }, [session]);

  return (
    <div className="w-full flex items-center justify-center gap-3">
      <button className="w-12 h-12 flex items-center justify-center active:scale-75 transition-transform duration-1500 hover:scale-125">
        <MdNavigateBefore
          onClick={playPrev}
          className="opacity-50 drop-shadow-sm select-none"
          size={28}
        />
      </button>

      <button className="active:scale-75 transition-transform duration-200 hover:scale-110">
        {isPlaying ? (
          <HiPause
            color={"#ffffff"}
            size={72}
            className="opacity-50 drop-shadow-lg select-none"
            onClick={() => pause(session?.user.accessToken!)}
          />
        ) : (
          <HiPlay
            color={"#ffffff"}
            size={72}
            className="opacity-50 select-none"
            onClick={() => play(session?.user.accessToken!)}
          />
        )}
      </button>

      <button className="w-12 h-12 flex items-center justify-center active:scale-75 transition-transform duration-100 hover:scale-125">
        <MdNavigateNext
          onClick={playNext}
          className="opacity-50 drop-shadow-sm select-none"
          size={28}
        />
      </button>
    </div>
  );
};

export default MusicControls;
