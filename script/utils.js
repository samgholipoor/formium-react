import path from 'path';

export const r = (...args) => path.resolve(__dirname, '..', ...args);

export default r;
