import Formium from '@/components/Formium';
import Check from '@/components/Check';

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
					<Check
						label="mrital status"
						name="name"
						multiple={true}
						options={[
							{ title: 'name', value: 'name' },
							{ title: 'family', value: 'family' },
							{ title: 'age', value: 'age' },
						]}
						// validator={[
						// 	(e) => !!e || 'is required',
						// 	(e) => e.length > 3 || 'must be more than three',
						// ]}
					/>
					<button type="submit">click me</button>
				</Formium>
			</div>
		</div>
	);
}

export default App;
