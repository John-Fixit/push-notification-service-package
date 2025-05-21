import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  // Client bundle
  {
    input: "src/client.js",
    output: [
      {
        file: "dist/client.cjs.js",
        format: "cjs",
        exports: "named",
        strict: true,
      },
      {
        file: "dist/client.esm.js",
        format: "es",
      },
      {
        file: "dist/client.umd.js",
        format: "umd",
        name: "PushNotificationClient",
        globals: {
          // No external dependencies for client
        },
      },
    ],
    plugins: [
      resolve({ browser: true }), // Target browser environment
      commonjs({
        transformMixedEsModules: true,
      }),
      terser(),
    ],
  },

  // Server bundle
  {
    input: "src/server.js",
    output: [
      {
        file: "dist/server.cjs.js",
        format: "cjs",
        exports: "named",
        strict: true,
      },
      {
        file: "dist/server.esm.js",
        format: "es",
      },
    ],
    plugins: [
      resolve({ preferBuiltins: true }),
      commonjs({
        transformMixedEsModules: true,
      }),
      terser(),
    ],
    external: ["express", "web-push"], // Mark server dependencies as external
  },

  // Full package (for Node.js)
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        exports: "named",
        strict: true,
      },
      {
        file: "dist/index.esm.js",
        format: "es",
      },
    ],
    plugins: [
      resolve({ preferBuiltins: true }),
      commonjs({
        transformMixedEsModules: true,
      }),
      terser(),
    ],
    external: ["express", "web-push"], // Mark server dependencies as external
  },
];
