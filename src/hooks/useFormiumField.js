import { useCallback, useEffect, useMemo } from 'react';
import { useFormium } from '@/providers/FormiumContext';
import { generateUUID } from '@/utils/uuid';

const emptyFn = () => {};
const trueFn = () => true;
const returnArgFn = (x) => x;

export function useFormiumField(
	{
		name,
		value: propsValue,
		onChange: propsOnChange = emptyFn,
		formatter = returnArgFn,
		validator = trueFn,
		...props
	} = {},
	defaultValue,
) {
	const parentForm = useFormium();
	const id = useMemo(() => generateUUID(), []);

	const value = useMemo(() => {
		if (parentForm?.values && name) {
			return parentForm?.values[name] || defaultValue;
		}
		return propsValue;
	}, [parentForm?.values, name, propsValue]);

	const onChange = useCallback(
		(newValue) => {
			if (parentForm?.setValue && name) {
				return parentForm?.setValue(name, newValue);
			}
			return propsOnChange(value);
		},
		[parentForm?.setValue, name, propsOnChange],
	);

	const error = useMemo(() => parentForm?.errors?.[name], [parentForm?.errors, name]);

	useEffect(() => {
		if (formatter) {
			parentForm?.setFormatter(name, formatter);
		}
	}, [formatter]);

	useEffect(() => {
		if (validator) {
			parentForm?.setValidator(name, validator);
		}
	}, [validator]);

	return useMemo(
		() => ({
			id,
			value,
			onChange,
			error,
			...props,
		}),
		[id, value, onChange, error, props],
	);
}

export default useFormiumField;
