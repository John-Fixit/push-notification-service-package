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
        file: "dist/client.mjs", // changed from .esm.js to .mjs
        format: "es",
      },
      {
        file: "dist/client.umd.js",
        format: "umd",
        name: "PushNotificationClient",
        globals: {},
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
        file: "dist/server.cjs.js",
        format: "cjs",
        exports: "named",
        strict: true,
      },
      {
        file: "dist/server.mjs", // changed from .esm.js
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
        file: "dist/index.mjs", // changed from .esm.js
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
// // Full package (index)
