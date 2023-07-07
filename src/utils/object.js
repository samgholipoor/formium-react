export const joinObjectValues = (obj, delimiter = '/') => {
	if (!obj || typeof obj !== 'object') {
		return '';
	}
	return Object.values(obj).reverse().join(delimiter) || '';
};
