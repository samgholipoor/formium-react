import DatePicker from '@/components/DatePicker';
import Formium from '@/components/Formium';

export default {
	title: 'Design System/Atoms/DatePicker',
	component: DatePicker,
	decorators: [
		(Story) => (
			<Formium values={{ date: '' }}>
				<Story />
			</Formium>
		),
	],
	tags: ['autodocs'],
	args: {
		name: 'date',
		label: 'Start date',
		isRange: false,
	},
};

export const SingleDatePicker = {
	args: {
		isRange: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'By single date-picker which you can choose one certain date',
			},
		},
	},
};

export const RangeDatePicker = {
	args: {
		isRange: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'By multiple date-picker which you can choose range of dates',
			},
		},
	},
};
