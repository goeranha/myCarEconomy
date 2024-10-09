import React from "react";
import Image from 'next/image';
import KostioXlLogo from '../assets/kostio-xl-logo.png';
import KostioBackpicture from '../assets/kostio-backpicture.png';
import LoanForm from "@/components/LoanForm";

export default async function Index() {
  return (
    <div>
      <div className="flex flex-col gap-4 items-center">
      <div className="flex gap-8 justify-center items-center flex-col">
        <Image src={KostioBackpicture} alt="Kostio Logo" width={350} />
        <Image src={KostioXlLogo} alt="Kostio Logo" width={200} />
      </div>
      <p className="text-md lg:text-4xl !leading-tight mx-auto max-w-xl text-center">
        Se hvor mye bilen egentlig koster!
      </p>
      <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent my-8" />
    </div>
      <main className="flex-1 flex flex-col gap-6 px-4">
        <LoanForm />
      </main>
    </div>
  );
}
