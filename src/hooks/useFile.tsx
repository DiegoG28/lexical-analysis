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
	};

	const selectFile = (file: IFile): void => {
		setCurrentFile(file);
	};

	return {
		files,
		currentFile,
		addFile,
		selectFile,
	};
};

export default useFile;
