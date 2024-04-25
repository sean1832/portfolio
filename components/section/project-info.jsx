import React from "react";
import Image from "next/image";
import ExternalTextLink from "../ui/external-text-link";
import { cn } from "@/utils/cn";
import ImageLists from "../ui/images-list";

const ProjectInfo = ({ data }) => {
  return (
    <section className=" flex flex-col gap-10">
      {/* hero image */}
      <div className="pt-32">
        <div className="flex relative w-full mx-auto h-[800px]">
          <Image src={data.hero.src} alt={data.hero.alt} layout="fill" objectFit="cover" />
        </div>
      </div>

      {/* project info */}
      <div className="grid grid-cols-12 max-w-9xl mx-auto gap-4 px-4">
        <div className=" flex flex-col gap-5 col-span-3 dark:text-gray-300 text-gray-700">
          <div>
            <div className="text-3xl font-semibold text-primary">{data.name.toUpperCase()}</div>
            <div className="font-bold text-primary">
              {data.type} - {data.year}
            </div>
          </div>

          {data.location.url ? (
            <div>
              <strong className="text-primary">Location: </strong>
              <ExternalTextLink href={data.location.url}>{data.location.name}</ExternalTextLink>
            </div>
          ) : (
            <div>
              <strong className="text-primary">Location: </strong>
              {data.location.name}
            </div>
          )}
          {data.group && data.group.length > 0 && (
            <div>
              <strong className="text-primary">Group: </strong>
              {data.group.join(", ")}
            </div>
          )}
          {data.tutors && data.tutors.length > 0 && (
            <div className="">
              <strong className="text-primary">Supervisors: </strong>
              {data.tutors.map((tutor, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ", "}
                  <ExternalTextLink href={tutor.url}>{tutor.name}</ExternalTextLink>
                </React.Fragment>
              ))}
            </div>
          )}

          {data.awards && data.awards.length > 0 && (
            <div className="">
              <strong className="text-primary">Awards: </strong>
              {data.awards.map((award, i) => (
                <div key={i}>
                  <ExternalTextLink href={award.url}>
                    {"- "}
                    {award.name}
                  </ExternalTextLink>
                </div>
              ))}
            </div>
          )}

          {data.publications && data.publications.length > 0 && (
            <div className="">
              <strong className="text-primary">Publications: </strong>
              {data.publications.map((link, i) => (
                <div key={i}>
                  <ExternalTextLink href={link.url}>
                    {"- "}
                    {link.name}
                  </ExternalTextLink>
                </div>
              ))}
            </div>
          )}

          <div className="">
            <strong className="text-primary">Description: </strong>
            {data.longDescription}
          </div>
        </div>
        {/* images */}
        <div className=" col-span-9">
          <ImageLists data={data} />
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
