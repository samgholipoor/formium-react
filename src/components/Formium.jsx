import { useReducer, useCallback, useMemo, useEffect } from 'react';
import { FormiumProvider } from '@/providers/FormiumContext';
import { mergeClassNames } from '@/utils';

const initialValues = {
	values: {},
	errors: {},
	formatters: {},
	validators: {},
	isSubmitting: false,
};

const actionTypes = {
	SET_VALUES: 'SET_VALUES',
	SET_FIELD_VALUEL: 'SET_FIELD_VALUE',
	SET_ERRORS: 'SET_ERRORS',
	SET_FIELD_ERROR: 'SET_FIELD_ERROR',
	SET_FIELD_FORMATTER: 'SET_FIELD_FORMATTER',
	SET_FIELD_VALIDATOR: 'SET_FIELD_VALIDATOR',
	SET_ISSUMBITTING: 'SET_ISSUMBITTING',
	RESET_FORM: 'RESET_FORM',
};

function formiumReducer(state, action) {
	switch (action.type) {
		case 'SET_VALUES':
			return { ...state, values: action.payload };
		case 'SET_FIELD_VALUE':
			return {
				...state,
				values: { ...state.values, [action.payload.field]: action.payload.value },
			};
		case 'SET_ERRORS':
			return { ...state, errors: { ...action.payload } };
		case 'SET_FIELD_ERROR':
			return {
				...state,
				errors: { ...state.errors, [action.payload.field]: action.payload.value },
			};
		case 'SET_FIELD_FORMATTER':
			return {
				...state,
				formatters: { ...state.formatters, [action.payload.field]: action.payload.value },
			};
		case 'SET_FIELD_VALIDATOR':
			return {
				...state,
				validators: { ...state.validators, [action.payload.field]: action.payload.value },
			};
		case 'SET_ISSUMBITTING':
			return { ...state, isSumbitting: action.payload };
		case 'RESET_FORM':
			return { ...state, ...action.payload };
		default:
			return state;
	}
}

function Formium({
	values,
	formatters,
	validators,
	action,
	onSuccess,
	onReject,
	className,
	children,
}) {
	const [state, dispatch] = useReducer(formiumReducer, {
		...initialValues,
		values,
		formatters,
		validators,
	});

	useEffect(() => {
		dispatch({
			type: actionTypes.SET_ERRORS,
			payload: {},
		});
	}, [state?.values]);

	const validatorHandler = useCallback(
		(field, validatorFns) => {
			const value = state.values[field];
			if (validatorFns && validatorFns.length > 0) {
				for (let i = 0; i < validatorFns.length; i += 1) {
					const validatorFn = validatorFns[i];
					if (typeof validatorFn !== 'function') continue;
					const validatorResult = validatorFn(value);
					if (validatorResult !== true) {
						dispatch({
							type: actionTypes.SET_FIELD_ERROR,
							payload: {
								field,
								value: validatorResult || 'InValid Value!!',
							},
						});
						return false;
					}
				}
			}
			return true;
		},
		[state?.validators, state?.values],
	);

	const runAllValidatorsAndCheck = useCallback(
		() =>
			Object.entries(state.validators)
				.map(([field, fns]) => validatorHandler(field, fns))
				.every(Boolean),
		[state.validators, state?.values, state?.errors],
	);

	const handleSubmit = useCallback(
		(e) => {
			e.stopPropagation();
			e.preventDefault();

			const isValidForm = runAllValidatorsAndCheck();

			if (!isValidForm) {
				const err = new Error('inValid Value has been inserted!!');
				err.status = 400;
				onReject(err);
			} else {
				action(state.values)
					.then(onSuccess)
					.catch((e) => {
						if (e?.status === 400) {
							Object.entries(e?.body?.field_errors || {}).forEach(([field, value]) => {
								dispatch({
									type: actionTypes.SET_FIELD_ERROR,
									payload: { field, value },
								});
							});
						}
						onReject(e);
					});
			}
		},
		[action, onSuccess, onReject, state.values, state.validators, dispatch],
	);

	const providerValues = useMemo(
		() => ({
			values: state.values,
			setValue: (field, value) =>
				dispatch({ type: actionTypes.SET_FIELD_VALUEL, payload: { field, value } }),
			errors: state.errors,
			setError: (field, value) =>
				dispatch({ type: actionTypes.SET_FIELD_ERROR, payload: { field, value } }),
			formatters: state.formatters,
			setFormatter: (field, value) =>
				dispatch({ type: actionTypes.SET_FIELD_FORMATTER, payload: { field, value } }),
			validators: state.validators,
			setValidator: (field, value) =>
				dispatch({ type: actionTypes.SET_FIELD_VALIDATOR, payload: { field, value } }),
		}),
		[state.values, state.errors, state.formatters, state.validators],
	);

	return (
		<FormiumProvider value={providerValues}>
			<form className={className} onSubmit={handleSubmit}>
				{children}
			</form>
		</FormiumProvider>
	);
}

Formium.defaultProps = {
	values: {},
	formatters: {},
	validators: {},
	action: () => {},
	onSuccess: () => {},
	onReject: () => {},
	children: null,
};

export default Formium;

export const ErrorMessage = ({ error }) =>
	error && (
		<label className="label">
			<span className="label-text-alt text-error whitespace-pre text-sm">{error}</span>
		</label>
	);

export const Label = ({ label, htmlFor, className, children }) => (
	<label
		htmlFor={htmlFor}
		className={mergeClassNames(className, 'flex flex-col items-start gap-1')}
	>
		<span>{label}</span>
		{children}
	</label>
);
