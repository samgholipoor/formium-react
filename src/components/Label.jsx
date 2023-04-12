import { mergeClassNames } from '@/utils';

const Label = ({ label, htmlFor, className, children }) => (
	<label
		htmlFor={htmlFor}
		className={mergeClassNames(className, 'flex flex-col items-start gap-1')}
	>
		<span>{label}</span>
		{children}
	</label>
);

export default Label;
