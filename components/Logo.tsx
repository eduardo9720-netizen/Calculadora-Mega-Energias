import Image from "next/image";

export default function Logo() {
  return (
    <Image
      src="/logo/mega-wordmark.png"
      alt="MEGA Energía Solar"
      width={2758}
      height={605}
      priority
      className="h-7 w-auto sm:h-8"
    />
  );
}
