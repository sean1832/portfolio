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
      <div className="text-4xl sm:text-6xl m:text-6xl lg:text-6xl font-bold text-center flex flex-col gap-0">
        <TextDecode text="INTELLIGENT SYNTHESIS" interval={50} />
      </div>
      <TextDecodeCycle
        texts={[
          "ALGORITHMIC MORPHOGENESIS",
          "AUTONOMOUS MATERIAL RECONSTRUCTION",
          "COGNITIVE ARCHITECTURAL MACHINES",
          "LOW-TECH ASSEMBLY CRAFT",
          "DIFFUSION TECTONICS",
        ]}
        interval={50}
        cycleInterval={3000}
      />
    </section>
  );
};

export default Landing;
