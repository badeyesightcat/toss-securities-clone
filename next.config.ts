import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  images: {
    remotePatterns: [
      new URL("https://static.tossinvestcdn.com/**"),
      new URL("https://img.newspim.com/news/**"),
      new URL("https://wimg.mk.co.kr/news/**"),
      new URL("https://static.toss.im/**"),
      new URL("https://image.edaily.co.kr/images/**"),
    ],
  },
};

export default nextConfig;
