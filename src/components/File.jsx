import { useCallback, useMemo, useRef } from 'react';
import { mergeClassNames } from '@/utils/classname';
import useFormiumField from '@/hooks/useFormiumField';
import { ErrorMessage, Label } from '@/components/Formium';

export default function File({
	className,
	label,
	multiple,
	placeholder,
	...formFieldProps
}) {
	const { id, value, onChange, error, ...props } = useFormiumField(
		formFieldProps,
		undefined,
	);

	const inputFileRef = useRef(null);

	const valueList = useMemo(() => {
		if (multiple) {
			return value ? [...value] : [];
		}
		return value ? [value] : [];
	}, [value]);

	const handleInputChange = useCallback(
		(event) => {
			const { files } = event.target;
			if (files) {
				onChange(multiple ? [...files] : files[0]);
			} else {
				onChange(undefined);
			}
		},
		[onChange],
	);

	const handleContainerDrop = useCallback(
		(event) => {
			event.preventDefault();
			const { files } = event.dataTransfer;
			if (files) {
				onChange(multiple ? [...files] : files[0]);
			} else {
				onChange(undefined);
			}
		},
		[onChange, multiple],
	);

	const handleContainerDragOver = useCallback((event) => event.preventDefault(), []);
	const handleContainerClick = useCallback(
		() => inputFileRef.current && inputFileRef.current.click(),
		[inputFileRef],
	);
	const handleContainerKeyDown = useCallback(
		(event) => {
			event.preventDefault();
			if (event.code === 'Enter' && inputFileRef.current) {
				inputFileRef.current.click();
			} else if (['Escape', 'Backspace', 'Delete'].includes(event.code)) {
				onChange(undefined);
			}
		},
		[onChange, multiple, inputFileRef],
	);

	const placeholderContent = valueList.length === 0 && (
		<div className="text-lg">{placeholder || '-Drop your file-'}</div>
	);

	const selectedFileContent = valueList.length > 0 && (
		<div className="text-md text-gray-900">
			{valueList.map((fileObj) => (
				<div key={`${fileObj.name}`}>- {fileObj.name}</div>
			))}
		</div>
	);

	return (
		<div className={mergeClassNames(className, 'form-control w-full')} {...props}>
			<Label label={label} htmlFor={id} />
			<div
				className="border-base-300 dark:border-base-content rounded text-sm focus:border-primary duration-150 transition-color h-52 flex items-center justify-center border-2 border-dashed text-base-content text-opacity-600"
				onDrop={handleContainerDrop}
				onDragOver={handleContainerDragOver}
				onClick={handleContainerClick}
				onKeyDown={handleContainerKeyDown}
				tabIndex={0}
				role="button"
			>
				<input
					id={id}
					type="file"
					onChange={handleInputChange}
					className="hidden"
					ref={inputFileRef}
					{...(multiple && { multiple: true })}
				/>
				{placeholderContent}
				{selectedFileContent}
			</div>
			<ErrorMessage error={error} />
		</div>
	);
}

File.defaultProps = {
	label: '',
	placeholder: '',
	multiple: false,
};
