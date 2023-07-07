import Input from '@/components/Input';
import Formium from '@/components/Formium';

export default {
	title: 'Design System/Atoms/Input',
	component: Input,
	decorators: [
		(Story) => (
			<Formium values={{ name: '' }}>
				<Story />
			</Formium>
		),
	],
	tags: ['autodocs'],
	args: {
		name: 'name',
		label: 'First Name',
		multiline: false,
		placeholder: 'Enter your name',
		type: 'text',
	},
};

export const TextInput = {
	parameters: {
		docs: {
			description: {
				story: 'Ordinary text input which you can enter any text',
			},
		},
	},
};

export const MultilineInput = {
	args: {
		label: 'Description',
		multiline: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Multiple check-box which you can choose more than one element',
			},
		},
	},
};
