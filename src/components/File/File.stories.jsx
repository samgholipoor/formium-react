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
				story: 'File input which you can upload just one file',
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
				story: 'File input with multi state you can upload more than one file',
			},
		},
	},
};
