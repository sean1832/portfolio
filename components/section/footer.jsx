import React from "react";
import { Separator } from "../ui/separator";
import ExternalTextLink from "../ui/external-text-link";

const Footer = () => {
  return (
    <div id="footer" className="flex flex-col pt-10">
      <Separator />
      <footer className="flex flex-col items-center justify-center py-10">
        <p className="text-gray-600 dark:text-gray-400 text-sm uppercase text-center">
          copyright &copy; 2024 ZekeZhang.com - All rights reserved.
        </p>
        {/* Source code Links */}
        <div className="flex items-center space-x-4">
          <ExternalTextLink
            href="https://github.com/sean1832/portfolio"
            className={`text-gray-600 dark:text-gray-400 text-sm uppercase text-center`}
          >
            Source Code
          </ExternalTextLink>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
