import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  // Client bundle
  {
    input: "src/client.js",
    output: [
      {
        file: "dist/client.cjs",
        preferConst: false,
        format: "cjs",
        exports: "auto", // Changed from "named" to "auto"
      },
      {
        file: "dist/client.mjs",
        format: "es",
      },
      {
        file: "dist/client.umd.js",
        format: "umd",
        name: "PushNotificationClient",
      },
    ],
    plugins: [
      resolve({ browser: true }),
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
        file: "dist/server.cjs",
        preferConst: false,
        format: "cjs",
        exports: "auto", // Changed from "named" to "auto"
        strict: false,
      },
      {
        file: "dist/server.mjs",
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
    external: ["express", "web-push"],
  },

  // Full package
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.cjs",
        preferConst: false,
        format: "cjs",
        exports: "auto", // Changed from "named" to "auto"
        strict: false,
      },
      {
        file: "dist/index.mjs",
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
    external: ["express", "web-push"],
  },
];
