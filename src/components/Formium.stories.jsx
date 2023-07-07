/* eslint-disable no-alert */
import Formium from '@/components/Formium';
import Input from '@/components/Input';
import Button from '@/components/Button';
import AuthForm from '@/pages/Form';

const Form = ({ handleAction, handleSuccess, handleReject }) => (
	<Formium
		values={{
			'first-name': '',
			'last-name': '',
		}}
		action={handleAction}
		onSuccess={handleSuccess}
		onReject={handleReject}
		className="flex flex-col gap-4"
	>
		<Input name="first-name" label="First name" />
		<Input name="last-name" label="Last name" />
		<Button type="submit" color="primary">
			Submit
		</Button>
	</Formium>
);

const HappyFlowForm = () => {
	const handleAction = (formData) => Promise.resolve(formData);
	const handleSuccess = (formData) => {
		alert(
			`Form Submit SuccessFully with following content: \n ${JSON.stringify(formData)}`,
		);
	};

	return <Form handleAction={handleAction} handleSuccess={handleSuccess} />;
};

const DangerFlowForm = () => {
	const handleAction = () => {
		const err = new Error('In valid value');
		err.status = 400;
		err.body = {};
		err.body.field_errors = {
			'first-name': 'must be more than 100 chars',
			'last-name': 'must be more than 100 chars',
		};
		return Promise.reject(err);
	};
	const handleReject = (formData) => {
		console.log('error: ', JSON.stringify(formData));
	};

	return <Form handleAction={handleAction} handleReject={handleReject} />;
};

export default {
	title: 'Provider/Formium',
	component: Formium,
	tags: ['autodocs'],
	args: {
		values: { 'first-name': '', 'last-name': '' },
	},
};

export const FromHappyFlow = {
	decorators: [HappyFlowForm],
};

export const FormDangerFlow = {
	decorators: [DangerFlowForm],
};

export const FormFilledByAllComponents = {
	decorators: [AuthForm],
};
