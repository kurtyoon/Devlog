import { NextConfig } from "next";

type ResourceQuery = { not?: (string | RegExp)[] };

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
