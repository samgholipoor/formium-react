import useFormiumField from '@/hooks/useFormiumField';
import { ErrorMessage, Label } from '@/components/Formium';
import { mergeClassNames } from '@/utils/classname';

const Toggle = ({ label, className, ...fieldProps }) => {
	const { id, value, onChange, error, ...props } = useFormiumField(fieldProps, false);

	return (
		<div className={mergeClassNames(className, 'form-control w-full')} {...props}>
			<Label label={label} />
			<div className="h-10 flex items-center">
				<input
					id={id}
					type="checkbox"
					checked={value}
					className="toggle"
					onChange={(e) => onChange(!!e.target.checked)}
				/>
				<ErrorMessage error={error} />
			</div>
		</div>
	);
};

Toggle.defaultProps = {
	label: '',
};

export default Toggle;
