import { useCallback, useMemo } from 'react';
import useFormiumField from '@/hooks/useFormiumField';
import { Label } from '@/components/Formium';
import { mergeClassNames } from '@/utils/classname';

const Check = ({ className, label, options, multiple, children, ...fieldProps }) => {
	const { id, value, onChange, error, ...props } = useFormiumField(fieldProps);

	const type = useMemo(() => (multiple ? 'checkbox' : 'radio'), [multiple]);

	const optionsObject = useMemo(
		() =>
			options.map((option) => {
				const { title, value: optionValue } = option;
				const isChecked = multiple ? value.includes(optionValue) : optionValue === value;
				return {
					title,
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
			<div className="flex items-center content-center gap-1 flex-wrap">
				{optionsObject.map((option) => (
					<label
						className="label cursor-pointer inline-flex items-center gap-2"
						key={option.value}
					>
						<input
							type={type}
							checked={option.isChecked}
							onChange={() => handleChange(option.value)}
							className={type}
						/>
						<span className="label-text text-base"> {option.title} </span>
					</label>
				))}
			</div>
		</div>
	);
};

Check.defaultProps = {
	label: '',
	options: [],
	multiple: false,
};

export default Check;
