import Check from '@/components/Check';
import Formium from '@/components/Formium';

export default {
	title: 'Design System/Atoms/Check',
	component: Check,
	decorators: [
		(Story) => (
			<Formium values={{ car: '' }}>
				<Story />
			</Formium>
		),
	],
	tags: ['autodocs'],
	args: {
		name: 'car',
		label: 'Cars',
		options: [
			{ label: 'name', value: 'name' },
			{ label: 'family', value: 'family' },
			{ label: 'age', value: 'age' },
		],
	},
};

export const SingleCheck = {
	args: {
		multiple: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Single check-box which you can choose one element from others',
			},
		},
	},
};

export const MultipleCheck = {
	args: {
		multiple: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Multiple check-box which you can choose more than one element',
			},
		},
	},
};
