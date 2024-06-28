import React from "react";
import { Separator } from "../ui/separator";
import ExternalTextLink from "../ui/external-text-link";
import manifest from "@data/manifest";
import { GetLatestUrl, GetRepoUrl } from "@/lib/getGithub";

const Footer = () => {
  const repo = manifest.repository.id;
  const version = manifest.version;
  const repoUrl = GetRepoUrl(repo);
  const latestUrl = GetLatestUrl(repo);

  return (
    <div id="footer" className="flex flex-col pt-10">
      <Separator />
      <footer className="flex flex-col items-center justify-center py-10">
        <p className="text-gray-600 dark:text-gray-400 text-sm uppercase text-center">
          copyright &copy; {new Date().getFullYear()} {manifest.copyright.name} - All rights
          reserved.
        </p>
        {/* Source code Links */}
        <div className="flex items-center space-x-4">
          <ExternalTextLink
            href={repoUrl}
            className="text-gray-600 dark:text-gray-400 text-sm uppercase text-center"
          >
            Source Code
          </ExternalTextLink>

          {/* Version */}
          <ExternalTextLink
            href={latestUrl}
            className="text-gray-600 dark:text-gray-400 text-sm uppercase text-center"
          >
            Version: {version}
          </ExternalTextLink>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
