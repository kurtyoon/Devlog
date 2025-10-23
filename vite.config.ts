import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
  optimizeDeps: {
    include: ["react-syntax-highlighter"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // 동적으로 청크 분할
          if (id.includes("react-router")) {
            return "router";
          }
          if (
            id.includes("react-markdown") ||
            id.includes("rehype") ||
            id.includes("remark")
          ) {
            return "markdown";
          }
          if (id.includes("gray-matter") || id.includes("fp-ts")) {
            return "utils";
          }
          if (id.includes("lozad") || id.includes("overlayscrollbars")) {
            return "ui";
          }
          // node_modules의 다른 라이브러리들
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
  },
});
