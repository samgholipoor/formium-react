module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['airbnb-base', 'eslint:recommended', 'plugin:react/recommended', 'prettier'],
	plugins: ['react', 'import'],
	overrides: [],
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	rules: {
		// react
		'react/react-in-jsx-scope': 'off',
		// js
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'unix'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		// import
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/order': [
			'error',
			{
				groups: ['builtin', 'external', 'parent', 'sibling', 'index'],
				pathGroups: [
					{
						pattern: 'react*',
						group: 'external',
						position: 'before',
					},
					{
						pattern: 'src/**/*',
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
				map: [['@', './src']],
				extensions: ['.js', '.ts', '.tsx', '.jsx', '.json'],
			},
		},
	},
};
