module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb-base',
		'eslint:recommended',
		'plugin:react/recommended',
		'prettier',
		'plugin:storybook/recommended',
	],
	plugins: ['react', 'import'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		// react
		'react/prop-types': 'off',
		'react/react-in-jsx-scope': 'off',
		// js
		'import/prefer-default-export': 'off',
		'no-continue': 'off',
		'default-param-last': 'off',
		'no-shadow': 'off',
		'no-useless-return': 'off',
		indent: [
			'error',
			'tab',
			{
				SwitchCase: 1,
			},
		],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		// import
		'import/extensions': 'off',
		'import/no-unresolved': 'off',
		'import/no-extraneous-dependencies': 'off',
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
				pathGroups: [
					{
						pattern: 'react',
						group: 'builtin',
						position: 'before',
					},
					{
						pattern: '@/**/*',
						group: 'parent',
						position: 'before',
					},
				],
				pathGroupsExcludedImportTypes: ['builtin'],
				'newlines-between': 'never',
			},
		],
	},
	settings: {
		'import/resolver': {
			alias: {
				map: [['@/*', 'src/*']],
				extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
			},
		},
	},
};
