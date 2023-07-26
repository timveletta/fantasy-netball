import React from "react";
import Text from "@/components/text";
import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Hero = () => {
  return (
    <div className="relative">
      <div className="container lg:grid lg:grid-cols-12 lg:gap-x-12 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <Text.Title>
              Unleash your inner coach.<span className="block text-primary">Build your dream netball team.</span>
            </Text.Title>
            <p className="my-6 text-lg text-gray-600 text-justify max-w-lg leading-relaxed">
              Join the ultimate Fantasy Netball experience and immerse yourself in the thrill of building your team and
              competing against your friends.
            </p>
            <Button asChild size="lg">
              <Link href="/sign-up">Join now!</Link>
            </Button>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <Image
            src="/heroimage.png"
            alt="Hero image - Thunderbirds win 2023 championship"
            width={900}
            height={500}
            className="aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
