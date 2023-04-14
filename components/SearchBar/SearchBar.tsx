import React from "react";

type Props = {};

function SearchBar({}: Props) {
  return (
    <>
      <div className="w-full h-auto top-48 fixed z-40 flex items-center justify-center">
        <input
          style={{ maxWidth: "600px" }}
          placeholder="Search for a song..."
          className="w-full h-16 bg-white bg-opacity-5 border-2 border-white shadow-2xl border-opacity-5 backdrop-blur-xl  rounded-md transform-gpu
                        outline-none px-3 text-white/75 backdrop-brightness-75"
        />
      </div>
    </>
  );
}

export default SearchBar;
