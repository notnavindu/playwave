import { signIn } from "next-auth/react";
import Image from "next/image";

type Props = {};

function LoginPage({}: Props) {
  return (
    <div className="w-full h-screen flex items-center justify-center flex-col gap-16">
      <Image src="/spotify.png" alt="spotify logo" width={236} height={71} />
      <button
        onClick={() => signIn("spotify")}
        className="w-full max-w-xs rounded-full py-3 bg-[#1db954] font-bold flex items-center justify-center"
      >
        Log in with Spotify
      </button>
    </div>
  );
}

export default LoginPage;
