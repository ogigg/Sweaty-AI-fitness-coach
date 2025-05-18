import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import prettier from 'eslint-plugin-prettier';
import globals from 'globals';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  ...compat.extends(
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'prettier',
    'plugin:react/jsx-runtime'
  ),
  {
    languageOptions: {
      globals: {
        ...globals.browser,
      },

      ecmaVersion: 5,
      sourceType: 'script',
    },
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': ['error', {}, { usePrettierrc: true }],
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off',
    },
  },
];
