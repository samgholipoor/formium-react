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
		multiple: false,
		options: [
			{ label: 'BMW', value: 1 },
			{ label: 'Benz', value: 2 },
			{ label: 'Toyota', value: 3 },
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
