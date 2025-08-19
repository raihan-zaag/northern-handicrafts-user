/* eslint-disable import/no-anonymous-default-export */
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...compat.extends('next/core-web-vitals'),
  {
    files: ['**/*.{js,jsx}'],
    rules: {
      /* --------- Core rules --------- */
      "no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",

      /* --------- Import rules --------- */
      // "import/no-unresolved": "error",
      "import/no-duplicates": "error",

      /* --------- React rules --------- */
      "react/react-in-jsx-scope": "off", // Next.js handles React
      "react/jsx-uses-react": "off",
      "react/jsx-uses-vars": "error",
      "react/prop-types": "off", // not needed unless you want prop-types
    },
  },
];
