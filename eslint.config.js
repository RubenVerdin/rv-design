import pluginVue from 'eslint-plugin-vue'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  { ignores: ['dist/**', '**/node_modules/**', 'storybook-static/**'] },

  // 1. TypeScript rules (sets @typescript-eslint/parser globally)
  ...tseslint.configs.recommended,

  // 2. Vue plugin (re-asserts vue-eslint-parser for *.vue files, overriding step 1)
  ...pluginVue.configs['flat/recommended'],

  // 3. Tell vue-eslint-parser to delegate <script> blocks to the TS parser
  {
    files: ['**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // 4. Story file overrides — render template strings can legitimately exceed 128 chars
  {
    files: ['stories/**/*.stories.ts'],
    rules: {
      'max-len': ['error', { code: 160, ignoreTemplateLiterals: true, ignoreUrls: true }],
    },
  },

  // 5. Project-wide rules
  {
    rules: {
      // Each attribute on its own line when element has more than one
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 1 },
        multiline: { max: 1 },
      }],

      // 128-character line limit; URLs/regex can't be shortened
      'max-len': ['error', {
        code: 128,
        ignoreUrls: true,
        ignoreRegExpLiterals: true,
      }],

      // Keep multi-attribute elements readable
      'vue/first-attribute-linebreak': ['error', {
        singleline: 'ignore',
        multiline: 'below',
      }],
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'always',
      }],
      'vue/html-self-closing': ['error', {
        html: { void: 'always', normal: 'always', component: 'always' },
        svg: 'always',
        math: 'always',
      }],
    },
  },
)
