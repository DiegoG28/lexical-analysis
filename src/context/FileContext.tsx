import { createContext } from 'react';

export interface IFile {
	name: string;
	code: string;
}

export interface IFileContexData {
	files: IFile[];
	currentFile: IFile | null;
	addFile: (newFile: IFile) => void;
	updateFile: (file: IFile) => void;
	selectFile: (file: IFile) => void;
	removeFile: (file: IFile) => void;
}

export const fileContextDefaultValue: IFileContexData = {
	files: [],
	currentFile: null,
	addFile: () => null,
	updateFile: () => null,
	selectFile: () => null,
	removeFile: () => null,
};

const FileContext = createContext<IFileContexData>(fileContextDefaultValue);

export default FileContext;
