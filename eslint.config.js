import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';

const compat = new FlatCompat();

export default [
  js.configs.recommended,
  {
    files: ['**/*.js', '**/*.jsx'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module'
    },
    environment: {
      browser: true,
      node: true
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'double']
    }
  }
];