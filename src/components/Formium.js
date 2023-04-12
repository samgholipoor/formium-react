import { useReducer, useCallback, ref, useMemo } from 'react';
import { FormiumProvider } from '@/providers/FormiumContext';

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
	onSubmit,
	onSuccess,
	onReject,
	children,
}) {
	const initialFormValue = ref(values);

	const [state, dispatch] = useReducer(formiumReducer, {
		...initialValues,
		values,
		formatters,
		validators,
	});

	const validatorHandler =
		((field, value) => {
			const validatorFn = state.validators[field];
			if (validatorFn) {
				const validatorResult = validatorFn(value);
				if (validatorResult !== true) {
					dispatch(actionTypes.SET_FIELD_ERROR, {
						field,
						value: validatorResult || 'InValid Value!!',
					});
					return false;
				}
			}
			return true;
		},
		[state.validators]);

	const runAllValidators = useCallback(
		() =>
			Object.entries(state.validators).some((field, value) =>
				validatorHandler(field, value),
			),
		[],
	);

	const resetForm = useCallback((nextState) => {
		const values = nextState.values ? nextState.values : initialFormValue;
		dispatch(actionTypes.RESET_FORM, { values });
	}, []);

	const handleSubmit = useCallback((e) => {
		e.stopPropagation();
		e.preventDefault();

		if (typeof onSubmit !== 'function') {
			return;
		}

		const hasError = runAllValidators();

		if (hasError) {
			const err = new Error('inValid Value has been inserted!!');
			err.status = 400;
			onReject(err);
		} else {
			onSubmit(state.values)
				.then((d) => onSuccess(d))
				.catch((e) => {
					if (e?.status === 400) {
						Object.entries(e?.body?.field_errors || {}).forEach(([field, value]) => {
							dispatch(actionTypes.SET_FIELD_ERROR, { field, value });
						});
					}
					onReject(e);
				});
		}
	}, []);

	const providerValues = useMemo(
		() => ({
			values: state.values,
			setValue: (field, value) =>
				dispatch(actionTypes.SET_FIELD_VALUEL, { field, value }),
			errors: state.errors,
			setError: (field, value) => dispatch(actionTypes.SET_FIELD_ERROR, { field, value }),
			formatters: state.formatters,
			setFormatter: (field, value) =>
				dispatch(actionTypes.SET_FIELD_FORMATTER, { field, value }),
			validators: state.validators,
			setValidator: (field, value) =>
				dispatch(actionTypes.SET_FIELD_VALIDATOR, { field, value }),
			resetForm,
		}),
		[state.values, state.errors, state.formatters, state.validators, resetForm],
	);

	return (
		<FormiumProvider values={providerValues}>
			<form onSubmit={handleSubmit}>{children}</form>
		</FormiumProvider>
	);
}

Formium.defaultProps = {
	values: {},
	formatters: {},
	validators: {},
	onSubmit: () => {},
	onSuccess: () => {},
	onReject: () => {},
	children: null,
};

export default Formium;
