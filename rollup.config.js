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
    external: ["web-push", "express"],
  },
];
