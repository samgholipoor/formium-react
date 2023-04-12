function ErrorMessage({ error }) {
	return (
		error && (
			<label className="label">
				<span className="label-text-alt text-error whitespace-pre text-sm">{error}</span>
			</label>
		)
	);
}

export default ErrorMessage;
