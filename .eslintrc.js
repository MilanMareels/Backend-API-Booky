module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
      project: 'tsconfig.json',
      tsconfigRootDir: __dirname,
      sourceType: 'module',
    },
    plugins: ['@typescript-eslint/eslint-plugin', 'import'],
    extends: [
      'plugin:@typescript-eslint/recommended',
      'prettier'
    ],
    root: true,
    env: {
      node: true,
    },
    ignorePatterns: ['.eslintrc.js', 'Backend-jest-GardenGuru/', 'node_modules/'],
    rules: {
      '@typescript-eslint/interface-name-prefix': 'off',
      '@typescript-eslint/explicit-function-return-type': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'import/order': [
        2,
        {
          'groups': [
            [
              'builtin',
              'external'
            ],
            [
              'internal',
              'unknown'
            ],
            [
              'parent',
              'sibling',
              'index'
            ]
          ],
          'newlines-between': 'always',
        }
      ],
    },
  };
  