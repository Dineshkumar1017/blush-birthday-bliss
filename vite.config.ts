import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
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
