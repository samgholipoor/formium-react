import Check from './Check';
import Formium from './Formium';

export default {
	title: 'Form/Check',
	component: Check,
	decorators: [
		(Check) => (
			<Formium>
				<Check name="car" />
			</Formium>
		),
	],
	tags: ['autodocs'],
};

export const Primary = {
	args: {
		label: 'cars',
		options: [
			{ label: 'BMW', value: 1 },
			{ label: 'Benz', value: 2 },
			{ label: 'Toyota', value: 3 },
		],
	},
};
