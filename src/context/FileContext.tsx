import { createContext } from 'react';

export interface IFile {
	name: string;
	code: string;
}

export interface IFileContexData {
	files: IFile[];
	currentFile: IFile | null;
	addFile: (newFile: IFile) => void;
	selectFile: (file: IFile) => void;
}

export const fileContextDefaultValue: IFileContexData = {
	files: [],
	currentFile: null,
	addFile: () => null,
	selectFile: () => null,
};

const CodeContext = createContext<IFileContexData>(fileContextDefaultValue);

export default CodeContext;
