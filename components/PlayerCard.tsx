import React from "react";

type Props = {};

const PlayerCard = (props: Props) => {
  return (
    <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-80 h-[500px] bg-white p-4 rounded-lg">
      <img
        className="w-full aspect-square rounded-md"
        src="https://i.scdn.co/image/ab67616d0000b27328c312ef08fa587bc2e2a764"
      />
    </div>
  );
};

export default PlayerCard;
