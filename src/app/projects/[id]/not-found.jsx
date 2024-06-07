import TextDecode from "@/components/animation/text-decode";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const ProjectNotFound = () => {
  return (
    <>
      <div className="h-screen flex items-center justify-center flex-col">
        <h1 className="font-bold text-center text-xl">
          <TextDecode interval={20} initChar="404">
            404 | Page Not Found
          </TextDecode>
        </h1>
        <Link href="/#projects">
          <Button className="mt-4 rounded-none">Go back projects</Button>
        </Link>
      </div>
    </>
  );
};

export default ProjectNotFound;
