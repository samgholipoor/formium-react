import Formium from '@/components/Formium';
import Input from '@/components/Input';

const Component = () => {
	const handleAction = (formData) => Promise.resolve(formData);
	const handleSucess = (formData) => {
		alert(
			`Form Submit SuccessFully with following content: \n ${JSON.stringify(formData)}`,
		);
	};

	return (
		<Formium
			action={handleAction}
			onSuccess={handleSucess}
			className="flex flex-col gap-4"
		>
			<Input name="first-name" label="First name" />
			<Input name="last-name" label="Last name" />
			<button type="submit">click me</button>
		</Formium>
	);
};

export default {
	title: 'Provider/Formium',
	component: Formium,
	tags: ['autodocs'],
	decorators: [Component],
	args: {
		values: { 'first-name': '', 'last-name': '' },
	},
};

export const FormiumSample = {};
