import React from "react";
import dynamic from "next/dynamic";

const TextDecode = dynamic(() => import("@/components/animation/text-decode"), {
  ssr: false,
});

const TextDecodeCycle = dynamic(() => import("@/components/animation/text-decode-cycle"), {
  ssr: false,
});

const Landing = () => {
  return (
    <section className="flex flex-col h-screen items-center justify-center" id="home">
      <div className="text-3xl sm:text-4xl m:text-5xl xl:text-5xl 2xl:text-6xl font-bold text-center flex flex-col gap-0">
        <TextDecode interval={50} initChar="PDPsLVHCdFwwaygPIdbXX">
          INTELLIGENT SYNTHESIS
        </TextDecode>
      </div>
      <div className="text-center flex flex-col gap-0">
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
      </div>
    </section>
  );
};

export default Landing;