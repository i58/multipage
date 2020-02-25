module.exports = {
    root: true,
    env: {
        node: true
    },
    //   extends: ['plugin:vue/essential', '@vue/prettier', '@vue/typescript'],
    extends: ['plugin:vue/essential', '@vue/typescript'],
    rules: {
        quotes: 'off',
        'quote-props': 'off',
        'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
        'one-var': 0,
        // "prettier/prettier": "error",
        'no-mixed-spaces-and-tabs': 'off',
        '@typescript-eslint/indent': ['warn', 4],
        '@typescript-eslint/explicit-function-return-type': 0
    },
    parserOptions: {
        parser: '@typescript-eslint/parser'
    }
}
