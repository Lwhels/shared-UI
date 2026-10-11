import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: "dist/lib",
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "SharedUI",
      fileName: (format) => `shared-ui.${format}.js`,
      formats: ["es", "umd"],
    },
    rollupOptions: {
      external: ["react", "react-dom", "framer-motion", "lucide-react"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "framer-motion": "Motion",
          "lucide-react": "LucideReact",
        },
      },
    },
  },
});
