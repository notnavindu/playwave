import ColorThief from "colorthief";
import { motion } from "framer-motion";
import { usePlayerStore } from "lib/stores/usePlayerStore";
import { AudioFeatures } from "lib/types/features";
import { ArtworkState } from "lib/types/meta";
import { getAudioFeatures } from "lib/utils/spotify.util";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import TrackStats from "./TrackStats";

type Props = {
  itemId: string;
  artworkState: ArtworkState;
  imageUrl: string;
};

const AlbumArt = (props: Props) => {
  const { data: session } = useSession();

  const [audioFeatures, setAudioFeatures] = useState<AudioFeatures>();
  const setPrimaryColor = usePlayerStore((state) => state.setPrimaryColor);

  const calculateColor = (event: any) => {
    const colorThief = new ColorThief();
    const colors = colorThief.getColor(event.target);

    setPrimaryColor(`rgb(${colors.join(",")})`);
  };

  useEffect(() => {
    getAudioFeatures(session?.user.accessToken!, props.itemId).then(
      ({ data }) => {
        setAudioFeatures(data);
      }
    );
  }, [props.itemId]);

  return (
    <>
      {props.artworkState == "artwork" ? (
        <motion.div
          key={`${props.itemId}-img`}
          initial={{ x: 200, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut" }}
        >
          <img
            className="w-full aspect-square srounded-[28px] z-10 p-4 drop-shadow-md"
            src={props.imageUrl}
            onLoad={calculateColor}
            crossOrigin="anonymous"
          />
        </motion.div>
      ) : (
        <motion.div
          key={`${props.artworkState}`}
          initial={{ x: 200, opacity: 0, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          transition={{ ease: "easeOut" }}
        >
          <TrackStats features={audioFeatures!} />
        </motion.div>
      )}

      <img
        className="absolute top-0 w-full aspect-square -z-10 blur-2xl brightness-200 "
        src={`${props.imageUrl}`}
      />
    </>
  );
};

export default AlbumArt;
