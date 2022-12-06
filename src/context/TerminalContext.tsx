import { createContext } from 'react';

export interface ITerminalContextData {
	output: string[];
	addOutput: (newOutput: string[]) => void;
}

export const terminalContextDefaultValue: ITerminalContextData = {
	output: [],
	addOutput: () => null,
};

const TerminalContext = createContext<ITerminalContextData>(
	terminalContextDefaultValue,
);

export default TerminalContext;
