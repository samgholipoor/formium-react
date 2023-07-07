import { useCallback } from 'react';
import PropTypes from 'prop-types';
import SelectOptions from 'react-select';
import { mergeClassNames } from '@/utils/classname';
import { ErrorMessage, Label } from '@/components/Formium';
import useFormiumField from '@/hooks/useFormiumField';

const formatInput = (selectedOptions) => {
	if (selectedOptions && Array.isArray(selectedOptions)) {
		return selectedOptions.map((selectedOption) => selectedOption.value);
	}
	if (selectedOptions && typeof selectedOptions === 'object') {
		return selectedOptions.value;
	}
	return [];
};

export default function Select({
	className,
	label,
	options,
	multiple,
	placeholder,
	...formFieldProps
}) {
	const { id, value, onChange, error, ...props } = useFormiumField(
		{
			formatter: formatInput,
			...formFieldProps,
		},
		multiple ? [] : undefined,
	);

	const handleChange = useCallback(
		(selectedOption) => {
			const newValue = selectedOption;
			return onChange(newValue);
		},
		[multiple, onChange],
	);

	return (
		<div className={mergeClassNames(className, 'form-control w-full')} {...props}>
			<Label label={label}>
				<SelectOptions
					value={value}
					onChange={handleChange}
					options={options}
					styles={{
						control: (baseStyles) => ({
							...baseStyles,
							borderColor: 'border-base-300',
							boxShadow: '0',
						}),
					}}
					className="w-full"
					placeholder={placeholder}
					{...(multiple ? { isMulti: true } : null)}
				/>
				<ErrorMessage error={error} />
			</Label>
		</div>
	);
}

Select.propTypes = {
	/**
	 * Select identifier
	 */
	name: PropTypes.string,
	/**
	 * Select label
	 */
	label: PropTypes.string,
	/**
	 * Select placeholder
	 */
	placeholder: PropTypes.string,
	/**
	 * Options of check, Array of objects
	 */
	options: PropTypes.arrayOf(PropTypes.shape({ label: 'example', value: 'example' })),
	/**
	 * Define the select state of being multiple or single selection
	 */
	multiple: PropTypes.bool,
};

Select.defaultProps = {
	label: '',
	options: [],
	multiple: false,
};
