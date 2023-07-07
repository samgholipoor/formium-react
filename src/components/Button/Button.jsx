import { useMemo } from 'react';
import PropTypes from 'prop-types';
import { mergeClassNames } from '@/utils/classname';
import { Spinner } from '@/components/common/Spinner';

function Button({
	component,
	disabled,
	selected,
	color = 'normal',
	size = 'md',
	square,
	transparent,
	className,
	children,
	loading,
	isFullWidth,
	...props
}) {
	const Component = component;

	const colorClass = useMemo(
		() =>
			({
				normal: !selected && 'bg-gray-500 dark:bg-opacity-20',
				primary:
					!selected &&
					'text-primary bg-primary dark:text-primary-content dark:bg-opacity-70',
				danger: !selected && 'text-red-500 bg-red-500 dark:bg-opacity-30',
			}[color]),
		[color, selected],
	);

	const sizeClass = useMemo(
		() =>
			({
				md: mergeClassNames('h-10 text-sm', square && 'w-10'),
				sm: mergeClassNames('h-8 text-sm', square && 'w-8'),
			}[size]),
		[size],
	);

	return (
		<Component
			className={mergeClassNames(
				'inline-flex items-center justify-center gap-2 rounded-md duration-150 whitespace-nowrap font-semibold relative overflow-hidden select-none',
				{ 'w-full': isFullWidth },
				transparent ? 'bg-opacity-0' : 'bg-opacity-10',
				!square && 'px-3',
				sizeClass,
				colorClass,
				!disabled &&
					!selected &&
					'hover:bg-opacity-20 focus:bg-opacity-25 active:bg-opacity-30 cursor-pointer',
				!disabled &&
					selected &&
					'bg-primary text-primary-content bg-opacity-100 cursor-default',
				disabled && 'text-base-content text-opacity-40 bg-opacity-0 cursor-not-allowed',
				className,
			)}
			{...props}
		>
			{!loading && children && <span>{children}</span>}
			{loading && (
				<div className="absolute top-0 left-0 h-full w-full flex items-center justify-center bg-base-300 bg-opacity-50">
					<Spinner className="w-4 h-4" />
				</div>
			)}
		</Component>
	);
}

Button.propTypes = {
	/**
	 * Button disabled state
	 */
	disabled: PropTypes.bool,
	/**
	 * Button selected state
	 */
	selected: PropTypes.bool,
	/**
	 * Button loading state
	 */
	loading: PropTypes.bool,
	/**
	 * Button fixed size
	 */
	square: PropTypes.bool,
	/**
	 * Button transparency
	 */
	transparent: PropTypes.bool,
	/**
	 * Button size
	 */
	size: PropTypes.oneOf(['sm', 'md']),
	/**
	 * Button colors
	 */
	color: PropTypes.oneOf(['normal', 'primary', 'danger']),
	/**
	 * Button content
	 */
	children: PropTypes.string,
	/**
	 * Button type
	 */
	type: PropTypes.oneOf(['submit', 'reset', 'button']),
	/**
	 * Button with full-width
	 */
	isFullWidth: PropTypes.bool,
	/**
	 * Button click action
	 */
	onClick: PropTypes.func,
};

Button.defaultProps = {
	component: 'button',
	color: 'normal',
	size: 'md',
	square: false,
	disabled: false,
	selected: false,
	loading: false,
	isFullWidth: false,
};

export default Button;
