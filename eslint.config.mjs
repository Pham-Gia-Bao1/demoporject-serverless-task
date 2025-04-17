import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import globals from "globals";
import prettier from "eslint-config-prettier";

export default defineConfig([
  js.configs.recommended,
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "CommonJS",
      globals: {
        ...globals.node,
      },
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off", // Cho phép dùng exports, require, v.v
    },
  },
  prettier,
]);
