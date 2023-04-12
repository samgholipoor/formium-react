const Label = ({ label, htmlFor, children }) => (
	<div className="flex flex-column items-center gap-1">
		<label htmlFor={htmlFor}>
			<span>{label}</span>
			{children}
		</label>
	</div>
);

export default Label;
