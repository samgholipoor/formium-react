import { mergeClassNames } from '@/utils/classname';

export function Spinner({ className, ...props }) {
	return (
		<div
			className={mergeClassNames(
				'rounded-full border-4 border-white border-t-gray-300 border-l-gray-50 border-r-gray-50 border-b-gray-50 cursor-wait animate-spin',
				className,
			)}
			{...props}
		/>
	);
}
