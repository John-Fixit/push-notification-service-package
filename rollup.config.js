import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { terser } from "rollup-plugin-terser";

export default [
  {
    input: "src/index.js",
    output: [
      {
        file: "dist/index.cjs.js",
        format: "cjs",
        exports: "named",
      },
      {
        file: "dist/index.esm.js",
        format: "es",
      },
      {
        file: "dist/index.umd.js",
        format: "umd",
        name: "PushNotificationService",
        exports: "named",
        globals: {
          window: "window",
          navigator: "navigator",
        },
      },
    ],
    plugins: [
      resolve({
        browser: true,
        preferBuiltins: false,
      }),
      commonjs({
        transformMixedEsModules: true,
      }),
      terser(),
    ],
    external: ["web-push"],
  },
  // Separate bundle for client
  {
    input: "src/client/PushNotificationClient.js",
    output: [
      {
        file: "dist/client.umd.js",
        format: "umd",
        name: "PushNotificationClient",
        exports: "named",
      },
    ],
    plugins: [
      resolve({
        browser: true,
      }),
      commonjs(),
      terser(),
    ],
  },
];
