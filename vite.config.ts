import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    dir: "src",
    workspace: [
      {
        extends: true,
        test: {
          name: "UNIT",
          dir: "src/services/tests",
        },
      },
      {
        extends: true,
        test: {
          name: "E2E",
          dir: "src/http/tests",
          environment: "./prisma/vitest-environment/prisma-test-environment.ts",
        },
      },
    ],
  },
});
