import { usePlayerStore } from "lib/stores/usePlayerStore";
import React from "react";
import ColorThief from "colorthief";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  imageUrl: string;
};

const AlbumArt = (props: Props) => {
  const setPrimaryColor = usePlayerStore((state) => state.setPrimaryColor);

  const calculateColor = (event: any) => {
    const colorThief = new ColorThief();
    const colors = colorThief.getColor(event.target);

    setPrimaryColor(`rgb(${colors.join(",")})`);
  };

  // FIXME: Change animation needs fixing
  return (
    <>
      <AnimatePresence>
        <motion.img
          className="w-full aspect-square rounded-[28px] z-10 p-4 drop-shadow-md transition-all"
          src={props.imageUrl}
          onLoad={calculateColor}
          crossOrigin="anonymous"
          key={props.imageUrl}
          initial={{ x: 200 }}
          animate={{ x: 0 }}
          transition={{ ease: "easeOut" }}
        />
        <img
          className="absolute top-0 w-full aspect-square -z-10 blur-2xl brightness-200 "
          src={`${props.imageUrl}`}
        />
      </AnimatePresence>
    </>
  );
};

export default AlbumArt;
