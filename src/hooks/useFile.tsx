/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import {
	IFileContexData,
	fileContextDefaultValue,
	IFile,
} from '@/context/FileContext';

const useFile = (): IFileContexData => {
	const [files, setFiles] = useState(fileContextDefaultValue.files);
	const [currentFile, setCurrentFile] = useState<IFile | null>(null);
	const [shouldUpdate, setShouldUpdate] = useState(false);

	const addFile = (newFile: IFile): void => {
		setFiles([...files, newFile]);
		setCurrentFile(newFile);
	};

	const selectFile = (file: IFile): void => {
		setCurrentFile(file);
	};

	const removeFile = (file: IFile): void => {
		const newFiles = files.filter(f => f.name !== file.name);
		setFiles(newFiles);
		setShouldUpdate(true);
	};

	useEffect(() => {
		if (shouldUpdate) {
			setCurrentFile(files[0]);
			setShouldUpdate(false);
		}
	}, [shouldUpdate]);

	return {
		files,
		currentFile,
		addFile,
		selectFile,
		removeFile,
	};
};

export default useFile;
