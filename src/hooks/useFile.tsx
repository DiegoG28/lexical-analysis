import { useState } from 'react';
import {
	IFileContexData,
	fileContextDefaultValue,
	IFile,
} from '@/context/FileContext';

const useFile = (): IFileContexData => {
	const [files, setFiles] = useState(fileContextDefaultValue.files);
	const [currentFile, setCurrentFile] = useState<IFile | null>(null);

	const addFile = (newFile: IFile): void => {
		setFiles([...files, newFile]);
		setCurrentFile(newFile);
	};

	const updateFile = (file: IFile): void => {
		const newFiles = files.map(f => {
			if (f.name === file.name) {
				return file;
			}
			return f;
		});
		setFiles(newFiles);
	};

	const selectFile = (file: IFile): void => {
		setCurrentFile(file);
	};

	const removeFile = (file: IFile): void => {
		const newFiles = files.filter(f => f.name !== file.name);
		setFiles(newFiles);
		setCurrentFile(newFiles[0]);
	};

	return {
		files,
		currentFile,
		addFile,
		updateFile,
		selectFile,
		removeFile,
	};
};

export default useFile;
