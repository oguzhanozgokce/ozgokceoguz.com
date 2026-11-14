import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

const noComments = {
  meta: { type: 'suggestion', schema: [] },
  create(context) {
    return {
      Program() {
        for (const comment of context.sourceCode.getAllComments()) {
          if (
            comment.type === 'Block' &&
            comment.range[0] === 0 &&
            /^\s*@license\b/.test(comment.value) &&
            comment.value.includes('SPDX-License-Identifier:')
          )
            continue;
          context.report({
            loc: comment.loc,
            message:
              'Only required licence headers belong in code. Put reasoning in commit messages or docs.',
          });
        }
      },
    };
  },
};

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTypescript,
  {
    plugins: { site: { rules: { 'no-comments': noComments } } },
    rules: {
      'site/no-comments': 'error',
      '@typescript-eslint/no-unused-vars': ['warn', { ignoreRestSiblings: true }],
    },
  },
  {
    files: ['src/components/ds/**/*.{ts,tsx}'],
    rules: {
      '@next/next/no-img-element': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'next-env.d.ts', 'public/**']),
]);

export default eslintConfig;
