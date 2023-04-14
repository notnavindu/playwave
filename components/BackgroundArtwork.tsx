import React from "react";

type Props = {};

const BackgroundArtwork = (props: Props) => {
  return (
    <div className="fixed top-1/3 -translate-y-1/2 left-1/2 -translate-x-1/2 z-0">
      <img
        className="w-96 h-96 transform-gpu blur-[100px] rounded-md brightness-200"
        src="https://i.scdn.co/image/ab67616d0000b27328c312ef08fa587bc2e2a764"
      />
    </div>
  );
};

export default BackgroundArtwork;
