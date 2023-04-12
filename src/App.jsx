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
			<Formium action={handleSubmit} onSuccess={handleSuccess} onReject={handleError}>
				<Input name="name" />
				<Input name="family" />
				<button type="submit">click me</button>
			</Formium>
		</div>
	);
}

export default App;
