import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/validations-form-react-ts/",
  plugins: [react()],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".vue", ".json"],
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
});
