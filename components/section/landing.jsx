import React from "react";
import dynamic from "next/dynamic";

const TextDecode = dynamic(() => import("@/components/ui/animation/text-decode"), {
  ssr: false,
});

const TextDecodeCycle = dynamic(() => import("@/components/ui/animation/text-decode-cycle"), {
  ssr: false,
});

const Landing = () => {
  return (
    <section className="flex flex-col h-screen items-center justify-center">
      <div className="text-4xl sm:text-6xl m:text-9xl lg:text-9xl font-bold text-center">
        <TextDecode text="ZEKE ZHANG" interval={50} />
      </div>
      <TextDecodeCycle
        texts={["INTELLEGENT FORMATION", "MATERIAL REUSE", "DIGITAL FABRICATION"]}
        interval={50}
        cycleInterval={3000}
      />
    </section>
  );
};

export default Landing;
