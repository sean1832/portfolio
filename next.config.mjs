/** @type {import('next').NextConfig} */
import withPlaiceholder from "@plaiceholder/next";
const nextConfig = {
  images: {
    domains: ["freight.cargo.site"],
  },
};
export default withPlaiceholder(nextConfig);
