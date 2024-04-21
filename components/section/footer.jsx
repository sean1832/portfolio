import React from "react";
import { Separator } from "../ui/separator";

const Footer = () => {
  return (
    <div id="footer" className="py-5">
      <Separator />
      <footer className="flex items-center justify-center py-5">
        <p className="text-gray-600 dark:text-gray-400 text-sm uppercase">
          copyright &copy; 2024 ZekeZhang.com - All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Footer;
