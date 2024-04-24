import React from "react";
import Image from "next/image";
import ExternalTextLink from "../ui/external-text-link";

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
      <div className="grid grid-cols-3 max-w-7xl mx-auto">
        <div className=" flex flex-col gap-5">
          <div>
            <div className="text-3xl font-semibold">{data.name}</div>
            <div className="font-bold">
              {data.type} - {data.year}
            </div>
          </div>

          {data.location.url ? (
            <div>
              <strong>Location: </strong>
              <ExternalTextLink href={data.location.url}>{data.location.name}</ExternalTextLink>
            </div>
          ) : (
            <div>
              <strong>Location: </strong>
              {data.location.name}
            </div>
          )}
          {data.group && data.group.length > 0 && (
            <div>
              <strong>Group: </strong>
              {data.group.join(", ")}
            </div>
          )}
          {data.tutors && data.tutors.length > 0 && (
            <div className="">
              <strong>Supervisors: </strong>
              {data.tutors.map((tutor, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ", "}
                  <ExternalTextLink key={i} href={tutor.url}>
                    {tutor.name}
                  </ExternalTextLink>
                </React.Fragment>
              ))}
            </div>
          )}

          {data.awards && data.awards.length > 0 && (
            <div className="">
              <strong>Awards: </strong>
              {data.awards.map((award, i) => (
                <div key={i}>
                  <ExternalTextLink key={i} href={award.url}>
                    {"- "}
                    {award.name}
                  </ExternalTextLink>
                </div>
              ))}
            </div>
          )}

          {data.publications && data.publications.length > 0 && (
            <div className="">
              <strong>Publications: </strong>
              {data.publications.map((link, i) => (
                <div key={i}>
                  <ExternalTextLink key={i} href={link.url}>
                    {"- "}
                    {link.name}
                  </ExternalTextLink>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className=" col-span-2">
          <div className="">{data.longDescription}</div>
        </div>
      </div>
    </section>
  );
};

export default ProjectInfo;
