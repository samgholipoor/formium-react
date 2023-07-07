import Formium from '@/components/Formium';
import Check from '@/components/Check';
import Toggle from '@/components/Toggle/Toggle';
import Select from './components/Select';
import File from './components/File';
import DatePicker from './components/DatePicker';

function App() {
	const handleSubmit = (e) => {
		console.log(e);
		return Promise.resolve(e);
	};

	const handleSuccess = (s) => {
		console.log('handleSuccess', s);
	};

	const handleError = (x) => {
		console.log('handleError', x);
	};

	return (
		<div className="App">
			<div>
				<Formium
					values={{ name: [] }}
					action={handleSubmit}
					onSuccess={handleSuccess}
					onReject={handleError}
				>
					<DatePicker name="date" isRange />
					<Check
						label="mrital status"
						name="name"
						options={[
							{ label: 'name', value: 'name' },
							{ label: 'family', value: 'family' },
							{ label: 'age', value: 'age' },
						]}
						// validator={[
						// 	(e) => !!e || 'is required',
						// 	(e) => e.length > 3 || 'must be more than three',
						// ]}
					/>
					<Select
						name="car"
						options={[
							{ label: 'Benz', value: 1 },
							{ label: 'Toyota', value: 2 },
							{ label: 'BMW', value: 3 },
						]}
					/>
					<File name="file" />
					<Toggle label="test" name="toggle" />
					<button type="submit">click me</button>
				</Formium>
			</div>
		</div>
	);
}

export default App;
