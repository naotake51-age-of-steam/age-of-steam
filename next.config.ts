import path from "path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */

  // 開発環境では開発中のcoreロジックをnpm linkして動作確認するため、outputFileTracingRootを設定している。
  outputFileTracingRoot:
    process.env.NODE_ENV === "development"
      ? path.join(__dirname, "../")
      : undefined,

  experimental: {
    viewTransition: true,
  },
};

export default nextConfig;
