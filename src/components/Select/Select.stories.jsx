import Select from '@/components/Select';
import Formium from '@/components/Formium';

export default {
	title: 'Design System/Atoms/Select',
	component: Select,
	decorators: [
		(Story) => (
			<Formium values={{ select: '' }}>
				<Story />
			</Formium>
		),
	],
	tags: ['autodocs'],
	args: {
		name: 'select',
		label: 'Cars',
		options: [
			{ label: 'BMW', value: 1 },
			{ label: 'Benz', value: 2 },
			{ label: 'Toyota', value: 3 },
		],
	},
};

export const SingleSelect = {
	args: {
		multiple: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Single select which you can choose one element from options',
			},
		},
	},
};

export const MultipleSelect = {
	args: {
		multiple: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Multiple select which you can choose more than one element from options',
			},
		},
	},
};
