import React from "react";
import AboutReveal from "./subSections/about-reveal";

const About = () => {
  return (
    <div id="about">
      <section className="flex flex-col justify-center items-center h-screen w-full">
        <AboutReveal />
      </section>
    </div>
  );
};

export default About;
