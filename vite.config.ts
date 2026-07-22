import { defineConfig } from "@lovable.dev/vite-tanstack-config";

const getNitroPreset = () => {
  if (process.env.VERCEL) return "vercel";
  if (process.env.NETLIFY) return "netlify";
  return "node-server";
};

export default defineConfig({
  nitro: {
    preset: getNitroPreset(),
  },
  vite: {
    server: {
      allowedHosts: ["blush-birthday-bliss.onrender.com"],
    },
    preview: {
      allowedHosts: ["blush-birthday-bliss.onrender.com"],
    },
  },
  tanstackStart: {
    server: {
      entry: "server",
    },
  },
});
