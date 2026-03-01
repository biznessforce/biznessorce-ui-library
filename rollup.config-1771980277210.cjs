'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var commonjs = require('@rollup/plugin-commonjs');
var image = require('@rollup/plugin-image');
var resolve = require('@rollup/plugin-node-resolve');
var typescript = require('@rollup/plugin-typescript');
var dts = require('rollup-plugin-dts');
var terser = require('@rollup/plugin-terser');
var peerDepsExternal = require('rollup-plugin-peer-deps-external');
var sourcemaps = require('rollup-plugin-sourcemaps');

const packageJson = require("./package.json");

var rollup_config = [
  {
    input: "src/index.ts",
    output: [
      {
        file: packageJson.main,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      // NEW
      typescript({
        declaration: true,
        declarationDir: "types",
        sourceMap: true,
        inlineSources: true,
      }),
      peerDepsExternal(),
      image(),
      sourcemaps(),
      resolve(),
      commonjs(),

      // NEW
      terser(),
    ],
  },
  {
    input: "dist/cjs/types/src/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts.default()],
    external: [/\.css$/],
  },
];

exports.default = rollup_config;
