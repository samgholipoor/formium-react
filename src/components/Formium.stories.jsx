/* eslint-disable no-alert */
import Formium from '@/components/Formium';
import Input from '@/components/Input';
import Button from '@/components/Button';
import Check from '@/components/Check';
import Select from '@/components/Select';
import File from '@/components/File';
import Toggle from '@/components/Toggle';
import DatePicker from '@/components/DatePicker';

const AuthForm = () => {
	const handleAction = (formData) => Promise.resolve(formData);
	const handleSuccess = (formData) => {
		alert(
			`Form Submit SuccessFully with following content: \n ${JSON.stringify(formData)}`,
		);
	};

	return (
		<Formium
			values={{
				'first-name': '',
				'last-name': '',
				cars: 0,
				gender: 0,
				skills: [],
				'on-site': false,
				'birth-date': undefined,
				'rom-to': undefined,
				'is-married': undefined,
				file: undefined,
			}}
			action={handleAction}
			onSuccess={handleSuccess}
			className="flex flex-col gap-4"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Input name="first-name" label="First name" />
				<Input name="last-name" label="Last name" />
				<Select
					name="cars"
					label="Cars"
					placeholder="Select car"
					options={[
						{ label: 'BMW', value: 1 },
						{ label: 'Toyota', value: 2 },
						{ label: 'Range Rover', value: 3 },
					]}
				/>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<Check
					name="gender"
					label="Genger"
					options={[
						{ label: 'Male', value: 1 },
						{ label: 'Woman', value: 2 },
						{ label: 'Other', value: 3 },
					]}
				/>
				<Check
					name="skills"
					label="Skills"
					options={[
						{ label: 'programming', value: 1 },
						{ label: 'Soft ware', value: 2 },
						{ label: 'AI', value: 3 },
						{ label: 'ML', value: 4 },
					]}
					multiple
				/>
				<Toggle name="on-site" label="On Site" />
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
				<DatePicker name="birth-date" label="BirthDate" />
				<DatePicker name="from-to" label="from - to worked date" isRange />
				<Toggle name="is-married" label="Is Married" />
			</div>
			<File name="file" />

			<Button type="submit" color="primary">
				Submit
			</Button>
		</Formium>
	);
};

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
