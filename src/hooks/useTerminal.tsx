import { useState } from 'react';
import {
	ITerminalContextData,
	terminalContextDefaultValue,
} from '@/context/TerminalContext';

const useTerminal = (): ITerminalContextData => {
	const [output, setOutput] = useState(terminalContextDefaultValue.output);

	const addOutput = (newOutput: string[]): void => {
		setOutput(newOutput);
	};

	return {
		output,
		addOutput,
	};
};

export default useTerminal;
