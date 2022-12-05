import { useState } from 'react';
import { CodeContexData, codeContextDefaultValue } from '@/context/CodeContext';

const useCode = (): CodeContexData => {
	const [code, setCode] = useState(codeContextDefaultValue.code);

	const updateCode = (newCode: string): void => {
		setCode(newCode);
	};

	return {
		code,
		updateCode,
	};
};

export default useCode;
