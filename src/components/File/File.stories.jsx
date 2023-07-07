import File from '@/components/File';
import Formium from '@/components/Formium';

export default {
	title: 'Design System/Atoms/File',
	component: File,
	decorators: [
		(Story) => (
			<Formium values={{ file: '' }}>
				<Story />
			</Formium>
		),
	],
	tags: ['autodocs'],
	args: {
		name: 'file',
		label: 'File',
		placeholder: 'Drop the file here',
		multiple: false,
	},
};

export const SingleFileUpload = {
	args: {
		placeholder: 'Drop the files here',
		multiple: false,
	},
	parameters: {
		docs: {
			description: {
				story: 'Single check-box which you can choose one element from others',
			},
		},
	},
};

export const MultipleFilesUpload = {
	args: {
		multiple: true,
	},
	parameters: {
		docs: {
			description: {
				story: 'Multiple check-box which you can choose more than one element',
			},
		},
	},
};
