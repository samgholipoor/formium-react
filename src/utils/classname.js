/* eslint-disable no-undef */
/* eslint-disable import/prefer-default-export */
import { typeOf } from '@/utils';

export const mergeClassNames = (...args) =>
	args
		.reduce((result, current) => {
			const type = typeOf(current);
			if (type === 'array') {
				result.push(...mergeClassNames(current));
			} else if (type === 'object') {
				Object.keys(current).forEach((key) => {
					const value = current[key];
					if (value) {
						result.push(key);
					}
				});
			} else if (type === 'function') {
				result.push(current);
			} else if (current) {
				result.push(current);
			}
			return result;
		}, [])
		.join(' ');
