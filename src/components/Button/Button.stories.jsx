import Check from '@/components/Button';

export default {
	title: 'Design System/Atoms/Button',
	component: Check,
	tags: ['autodocs'],
	args: {
		children: 'click me',
		disabled: false,
		selected: false,
		square: false,
		transparent: false,
		loading: false,
		isFullWidth: true,
		color: 'normal',
		size: 'md',
		type: 'button',
		onClick: () => {},
	},
};

export const Primary = {
	args: {
		color: 'primary',
	},
};

export const Danger = {
	args: {
		color: 'danger',
	},
};

export const Normal = {
	args: {
		color: 'normal',
	},
};
