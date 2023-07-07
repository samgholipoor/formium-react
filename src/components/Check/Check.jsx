import { useCallback, useMemo } from 'react';
import PropTypes from 'prop-types';
import useFormiumField from '@/hooks/useFormiumField';
import { ErrorMessage, Label } from '@/components/Formium';
import { mergeClassNames } from '@/utils/classname';

const Check = ({ className, label, options, multiple, ...fieldProps }) => {
	const { id, value, onChange, error, ...props } = useFormiumField(
		fieldProps,
		multiple ? [] : undefined,
	);

	const type = useMemo(() => (multiple ? 'checkbox' : 'radio'), [multiple]);

	const optionsObject = useMemo(
		() =>
			options.map((option) => {
				const { label, value: optionValue } = option;
				const isChecked = multiple ? value.includes(optionValue) : optionValue === value;
				return {
					label,
					value: optionValue,
					isChecked,
				};
			}),
		[options, value, multiple],
	);

	const handleChange = useCallback(
		(optionValue) => {
			let newValue = value;
			if (multiple) {
				const index = value.indexOf(optionValue);
				if (index > -1) {
					newValue = [...value.slice(0, index), ...value.slice(index + 1)];
				} else {
					newValue = [...value, optionValue];
				}
			} else if (value === optionValue) {
				newValue = undefined;
			} else {
				newValue = optionValue;
			}
			return onChange(newValue);
		},
		[value, multiple, onChange],
	);

	return (
		<div className={mergeClassNames(className, 'form-control w-full')} {...props}>
			<Label label={label} />
			<div className="flex items-center content-center gap-4 flex-wrap">
				{optionsObject.map((option) => (
					<label
						className="label cursor-pointer inline-flex items-center gap-2 px-0"
						key={option.value}
					>
						<input
							type={type}
							checked={option.isChecked}
							onChange={() => handleChange(option.value)}
							className={type}
						/>
						<span className="label-text text-base"> {option.label} </span>
					</label>
				))}
			</div>
			<ErrorMessage error={error} />
		</div>
	);
};

Check.propTypes = {
	/**
	 * Checkbox identifier
	 */
	name: PropTypes.string,
	/**
	 * Checkbox label
	 */
	label: PropTypes.string,
	/**
	 * Options of checkbox which is an array of objects
	 */
	options: PropTypes.arrayOf(PropTypes.shape({ label: 'example', value: 'example' })),
	/**
	 * Define the check state of being multiple or single selection
	 */
	multiple: PropTypes.bool,
};

Check.defaultProps = {
	label: '',
	options: [],
	multiple: false,
};

export default Check;
