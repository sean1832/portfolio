import React from "react";
import { Separator } from "../ui/separator";
import ExternalTextLink from "../ui/external-text-link";
import manifest from "@/data/manifest";

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
            href={manifest.repository.url}
            className={`text-gray-600 dark:text-gray-400 text-sm uppercase text-center`}
          >
            Source Code
          </ExternalTextLink>

          {/* Version */}
          <ExternalTextLink
            href={manifest.repository.latestRelease}
            className={`text-gray-600 dark:text-gray-400 text-sm uppercase text-center`}
          >
            Version: {manifest.version}
          </ExternalTextLink>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
