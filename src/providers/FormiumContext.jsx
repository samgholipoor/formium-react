import { createContext, useContext } from 'react';

const FormiumContext = createContext();
const FormiumProvider = FormiumContext.Provider;

function useFormium() {
	const formium = useContext(FormiumContext);

	if (!formium) {
		throw new Error('Formium doest exist!!');
	}

	return formium;
}

export { FormiumProvider, useFormium };
