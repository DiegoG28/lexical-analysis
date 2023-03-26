import React, { createContext, useState, ReactNode } from 'react';

// Definimos la estructura de nuestro contexto
export interface ITerminalContext {
	addOutput: (newOutput: IError[]) => void;
	output: IError[];
}

interface IError {
	type: string;
	message: string;
	line: number;
}

// Creamos nuestro contexto y lo inicializamos como null
export const TerminalContext = createContext<ITerminalContext | null>(null);

// Definimos nuestro componente proveedor del contexto
export const TerminalProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	// Definimos nuestro estado inicial con un array vacío de errores
	const [output, setOutput] = useState<IError[]>([]);

	// Definimos nuestra función addOutput, que agrega nuevos errores al array de errores
	const addOutput = (newOutput: IError[]): void => {
		setOutput(newOutput);
	};

	// Creamos un objeto con las funciones y variables del contexto
	const contextValue: ITerminalContext = {
		addOutput,
		output,
	};

	// Retornamos el proveedor del contexto, pasándole el objeto con las funciones y variables
	return (
		<TerminalContext.Provider value={contextValue}>
			{children}
		</TerminalContext.Provider>
	);
};
