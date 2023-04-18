import { signIn } from "next-auth/react";
import Image from "next/image";
import { TiWaves } from "react-icons/ti";

type Props = {};

function LoginPage({}: Props) {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-16">
      <div className="text-5xl flex items-center">
        Playwave
        <TiWaves className="pt-2" />
      </div>
      <button
        onClick={() => signIn("spotify")}
        className="w-full max-w-xs rounded-full py-3 bg-[#1db954] font-bold flex items-center justify-center"
      >
        Log in with Spotify
      </button>

      <Image
        src="/spotify.png"
        alt="spotify logo"
        width={236 / 2}
        height={71 / 2}
      />
    </div>
  );
}

export default LoginPage;
