import React from "react";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div id="footer" className="flex flex-col pt-10">
      <Separator />
      <footer className="flex items-center justify-center py-10">
        <p className="text-gray-600 dark:text-gray-400 text-sm uppercase text-center">
          copyright &copy; 2024 ZekeZhang.com - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
