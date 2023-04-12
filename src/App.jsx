import Formium from '@/components/Formium';
import Input from '@/components/Input';

function App() {
	const handleSubmit = (e) => {
		console.log(e);
		return Promise.resolve(e);
	};

	const handleSuccess = (s) => {
		console.log(s);
	};

	const handleError = (x) => {
		console.log(x);
	};

	return (
		<div className="App">
			<h2 className="text-sm text-lime-600">Boiler Plate</h2>
			<div>
				<Formium action={handleSubmit} onSuccess={handleSuccess} onReject={handleError}>
					<Input label="test" name="name" />
					<Input name="family" validator={(e) => !!e || 'this is error'} />
					<button type="submit">click me</button>
				</Formium>
			</div>
		</div>
	);
}

export default App;
