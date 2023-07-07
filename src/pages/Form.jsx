import Formium from '@/components/Formium';
import Check from '@/components/Check';
import Toggle from '@/components/Toggle/Toggle';
import Input from '@/components/Input';
import Button from '@/components/Button';
import DatePicker from '@/components/DatePicker/DatePicker';
import Select from '@/components/Select';
import File from '@/components/File';

const Form = () => {
	const handleAction = (formData) => Promise.resolve(formData);
	const handleSuccess = (formData) => {
		alert(
			`Form Submit SuccessFully with following content: \n ${JSON.stringify(formData)}`,
		);
	};

	return (
		<section className="flex flex-col items-center w-full mt-8">
			<h2 className="text-2xl font-bold mb-6">Submit your identity</h2>
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
				className="flex flex-col item gap-4 max-w-4xl border border-base-300 p-4 rounded-lg"
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
							{ label: 'Software', value: 2 },
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
		</section>
	);
};

export default Form;
