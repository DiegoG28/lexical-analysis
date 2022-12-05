import { createContext } from 'react';

export interface CodeContexData {
	code: string;
	updateCode: (newCode: string) => void;
}

export const codeContextDefaultValue: CodeContexData = {
	code: '',
	updateCode: () => null,
};

const CodeContext = createContext<CodeContexData>(codeContextDefaultValue);

export default CodeContext;
