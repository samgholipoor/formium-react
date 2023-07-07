import Toggle from '@/components/Toggle';
import Formium from '@/components/Formium';

export default {
	title: 'Design System/Atoms/Toggle',
	component: Toggle,
	decorators: [
		(Story) => (
			<Formium values={{ permission: '' }}>
				<Story />
			</Formium>
		),
	],
	tags: ['autodocs'],
	args: {
		name: 'permission',
		label: 'Has permission?',
	},
};

export const Primary = {
	parameters: {
		docs: {
			description: {
				story:
					'Toggle is used for determining the state of sth by returning boolean value',
			},
		},
	},
};
