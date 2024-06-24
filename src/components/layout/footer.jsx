import React from "react";
import { Separator } from "../ui/separator";
import ExternalTextLink from "../ui/external-text-link";
import manifest from "@/data/manifest";
import { FetchLatestUrl, FetchLatestVersion, FetchRepoUrl } from "@/lib/fetchGithub";

const Footer = async () => {
  const repo = manifest.repository.id;
  const versionNum = await FetchLatestVersion(repo);
  const repoUrl = await FetchRepoUrl(repo);
  const latestUrl = await FetchLatestUrl(repo);

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
            Version: {versionNum}
          </ExternalTextLink>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
