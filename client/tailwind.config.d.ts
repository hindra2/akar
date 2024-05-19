// tailwind.config.d.ts
declare module "*/tailwind.config" {
  import { Config } from "tailwindcss";
  const config: Config;
  export default config;
}
