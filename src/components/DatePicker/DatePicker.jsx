import { useEffect, useRef, useMemo, useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import IDate from 'idate';
import { Calendar } from '@hassanmojab/react-modern-calendar-datepicker';
import { mergeClassNames } from '@/utils/classname';
import { joinObjectValues } from '@/utils/object';
import { ErrorMessage, Label } from '@/components/Formium';
import useFormiumField from '@/hooks/useFormiumField';
import '@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css';

const localDate = (date) => date.toISOString().replace(/T.+/, '');

function DatePicker({
	className,
	label,
	placeholder,
	isRange,
	locale,
	...formFieldProps
}) {
	const { id, value, onChange, error, ...props } = useFormiumField(
		formFieldProps,
		isRange ? { to: '', from: '' } : '',
	);

	const refInput = useRef(null);
	const calendarContainerElement = useRef(null);
	const shouldPreventToggle = useRef(false);
	const [isCalendarOpen, setIsCalendarOpen] = useState(false);
	const [date, setDate] = useState(value);

	const handleFocus = useCallback(() => {
		if (!shouldPreventToggle.current) setIsCalendarOpen(true);
	}, []);

	const handleBlur = useCallback(
		(e) => {
			e.persist();
			const isInnerElementFocused = calendarContainerElement.current?.contains(
				e.relatedTarget,
			);
			if (shouldPreventToggle.current) {
				shouldPreventToggle.current = false;
				refInput.current?.focus();
			} else if (isInnerElementFocused && e.relatedTarget) {
				e.relatedTarget.focus();
			} else {
				setIsCalendarOpen(false);
			}
		},
		[isCalendarOpen, calendarContainerElement],
	);

	const formatToISODate = (e) => {
		const { year, month, day } = e;
		const d =
			locale === 'fa'
				? new IDate(year, month - 1, day + 1).gdate
				: new Date(year, month - 1, day + 1);

		return localDate(d);
	};

	const handleChange = useCallback(
		(e) => {
			setDate(e);
			if (isRange) {
				const { to, from } = e;
				onChange({
					to: formatToISODate(to),
					from: formatToISODate(from),
				});
			} else {
				onChange(formatToISODate(e));
			}
			setIsCalendarOpen(false);
		},
		[onChange],
	);

	useEffect(() => {
		if (!isCalendarOpen) refInput.current?.blur();
	}, [isCalendarOpen]);

	useEffect(() => {
		if (!isCalendarOpen && shouldPreventToggle.current) {
			refInput.current?.focus();
			shouldPreventToggle.current = false;
		}
	}, [shouldPreventToggle, isCalendarOpen]);

	const formattedValue = useMemo(() => {
		if (!date) return '';
		if (typeof date === 'string') {
			return date;
		}
		if (
			Object.hasOwnProperty.call(date, 'to') &&
			Object.hasOwnProperty.call(date, 'from')
		) {
			if (!date.to && !date.from) {
				return '';
			}

			return `${joinObjectValues(date.from)} - ${joinObjectValues(date.to)}`;
		}

		return joinObjectValues(date);
	}, [date, value]);

	const calendarValue = useMemo(() => {
		if (!date) return '';
		if (typeof date === 'string') {
			const [year, month, day] = date.split('/').map(Number);
			return { year, month, day };
		}
		return date;
	}, [date, value]);

	return (
		<div className={mergeClassNames(className, 'w-full')} {...props}>
			<Label label={label} htmlFor={id}>
				<input
					id={id}
					readOnly
					type="text"
					ref={refInput}
					onFocus={handleFocus}
					onBlur={handleBlur}
					value={formattedValue}
					placeholder={placeholder || label}
					className="block w-full bg-base-100 dark:bg-base-300 focus:bg-opacity-100 focus:bg-base-100  px-3 border border-base-300 rounded text-base focus:border-primary duration-150 transition-colors h-10"
				/>
				<ErrorMessage error={error} />
			</Label>
			{isCalendarOpen && (
				<div
					ref={calendarContainerElement}
					role="presentation"
					onMouseDown={() => {
						shouldPreventToggle.current = true;
					}}
					className="absolute"
				>
					<Calendar
						locale={locale}
						value={calendarValue}
						onChange={handleChange}
						shouldHighlightWeekends
					/>
				</div>
			)}
		</div>
	);
}

DatePicker.propTypes = {
	/**
	 * DatePicker identifier
	 */
	name: PropTypes.string,
	/**
	 * DatePicker label
	 */
	label: PropTypes.string,
	/**
	 * DatePicker placeholder
	 */
	placeholder: PropTypes.string,
	/**
	 * DatePicker range which determine to select one date or range of dates
	 */
	isRange: PropTypes.bool,
	/**
	 * DatePicker locale which define jalali and ad date
	 */
	locale: PropTypes.oneOf(['fa', 'en']),
};

DatePicker.defaultProps = {
	locale: 'en',
};

export default DatePicker;
