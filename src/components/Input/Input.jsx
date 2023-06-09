import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import { useFormiumField } from '@/hooks/useFormiumField';
import { ErrorMessage, Label } from '@/components/Formium';
import { mergeClassNames } from '@/utils/classname';

const Input = ({ label, placeholder, multiline, type, className, ...fieldProps }) => {
	const { id, value, onChange, error, ...props } = useFormiumField(fieldProps, '');

	const Tag = multiline ? 'textarea' : 'input';

	const formattedValue = useMemo(() => {
		if (typeof value === 'string') {
			return value;
		}
		if (typeof value === 'undefined' || value === null) {
			return '';
		}
		return value.toString();
	}, [value, multiline]);

	const handleChange = useCallback((e) => {
		onChange(e.target.value);
	}, []);

	return (
		<Label
			label={label}
			htmlFor={id}
			className={mergeClassNames(className, 'w-full')}
			{...props}
		>
			<Tag
				id={id}
				type={type}
				value={formattedValue}
				onChange={handleChange}
				placeholder={placeholder || label}
				className={mergeClassNames(
					'block bg-base-100 w-full px-3 border border-base-300 rounded text-base focus:border-primary duration-150 transition-colors',
					multiline && 'py-2 h-40 min-h-16 max-h-96',
					!multiline && 'h-10',
				)}
			/>
			<ErrorMessage error={error} />
		</Label>
	);
};

Input.propTypes = {
	/**
	 * Input identifier
	 */
	name: PropTypes.string,
	/**
	 * Input label
	 */
	label: PropTypes.string,
	/**
	 * Input placeholder
	 */
	placeholder: PropTypes.string,
	/**
	 * Define the input state of being text input or text area
	 */
	multiline: PropTypes.bool,
	/**
	 * Input type
	 */
	type: PropTypes.oneOf(['text', 'email', 'password']),
};

Input.defaultProps = {
	label: '',
	placeholder: '',
	multiline: false,
	type: 'text',
};

export default Input;
