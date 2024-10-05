import Image from 'next/image';
import KostioBackPicture from "../assets/kostio-backpicture.png";
import KostioXlLogo from "../assets/kostio-xl-logo.png";

export default function Hero() {
  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-8 justify-center flex-col items-center">
      <Image src={KostioBackPicture} alt="Kostio Logo" width={800} />
      <Image src={KostioXlLogo} alt="Kostio Logo" width={250} />
      </div>
      <p className="text-md lg:text-2xl !leading-tight mx-auto max-w-xl text-center">
        Se hvor mye bilen egentlig koster!
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
  );
}
