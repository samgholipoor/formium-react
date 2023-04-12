import { createContext, useContext } from 'react';

const FormiumContext = createContext();

const FormiumProvider = FormiumContext.Provider;
const FormiumConsumer = FormiumContext.Consumer;

function useFormiumContext() {
	const formium = useContext(FormiumContext);

	if (formium) {
		throw new Error('Formium doest exist!!');
	}

	return formium;
}

export { FormiumProvider, FormiumConsumer, useFormiumContext };
