import React from "react";
import Link from "next/link";
import Image from "next/image";

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
        <div className="">
          <div className="text-3xl font-semibold">{data.name}</div>
          <div className="font-bold">
            {data.type} - {data.year}
          </div>

          {data.location.url ? (
            <div>
              <strong>Location: </strong>
              <Link
                href={data.location.url}
                target="_blank"
                className="text-primary underline-offset-4 hover:underline"
              >
                {data.location.name}
              </Link>
            </div>
          ) : (
            <div>
              <strong>Location: </strong>
              {data.location.name}
            </div>
          )}

          {data.tutors && data.tutors.length > 0 && (
            <div className="">
              <strong>Supervisors: </strong>
              {data.tutors.map((tutor, i) => (
                <React.Fragment key={i}>
                  {i > 0 && ", "}
                  <Link
                    key={i}
                    href={tutor.url}
                    target="_blank"
                    className="text-primary underline-offset-4 hover:underline"
                  >
                    {tutor.name}
                  </Link>
                </React.Fragment>
              ))}
            </div>
          )}

          {data.group && data.group.length > 0 && (
            <div>
              <strong>Group: </strong>
              {data.group.join(", ")}
            </div>
          )}

          {data.awards && data.awards.length > 0 && (
            <div className="">
              <strong>Awards: </strong>
              {data.awards.map((award, i) => (
                <div key={i}>
                  <Link
                    key={i}
                    className="text-primary underline-offset-4 hover:underline"
                    href={award.url}
                    target="_blank"
                  >
                    {"- "}
                    {award.name}
                  </Link>
                </div>
              ))}
            </div>
          )}

          {data.publications && data.publications.length > 0 && (
            <div className="">
              <strong>Publications: </strong>
              {data.publications.map((link, i) => (
                <div key={i}>
                  <Link
                    key={i}
                    className="text-primary underline-offset-4 hover:underline"
                    href={link.url}
                    target="_blank"
                  >
                    {"- "}
                    {link.name}
                  </Link>
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
