import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettier from 'eslint-config-prettier';
import eslintPluginTypescript from '@typescript-eslint/eslint-plugin'; // 引入 TypeScript 插件
import typescriptParser from '@typescript-eslint/parser'; // 引入 TypeScript 解析器

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      globals: globals.browser, // 定义浏览器环境中的全局变量
      parser: typescriptParser, // 使用 TypeScript 解析器
    },
    rules: {
      // 直接在此处添加 JavaScript 和 TypeScript 推荐规则
      ...pluginJs.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
    },
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      sourceType: 'script', // 将 JS 文件解析为脚本模式
    },
  },
  {
    // 添加 Prettier 配置以避免与其他规则冲突
    plugins: {
      prettier: eslintPluginPrettier, // 使用插件对象而不是字符串
    },
    rules: {
      'prettier/prettier': 'error', // 将 Prettier 错误显示为 ESLint 错误
      ...prettier.rules, // 引入 Prettier 的规则
    },
  },
  {
    // 可选：增加自定义规则
    plugins: {
      '@typescript-eslint': eslintPluginTypescript, // 确保 TypeScript 插件在 plugins 中配置
    },
    rules: {
      'no-console': 'warn', // 控制 console 的使用（警告）
      'no-debugger': 'warn', // 控制 debugger 的使用（警告）
      '@typescript-eslint/no-unused-vars': 'error', // TypeScript 中禁止未使用的变量
    },
  },
];
