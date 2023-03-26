import { useContext } from 'react';
import { ITerminalContext, TerminalContext } from '@/context/TerminalContext';

// Definimos nuestro hook useTerminal, que nos permite acceder al contexto
export const useTerminal = (): ITerminalContext => {
	// Obtenemos el valor del contexto con useContext
	const context = useContext(TerminalContext);

	// Si el contexto no existe, lanzamos un error
	if (!context) {
		throw new Error('useTerminal must be used within a TerminalProvider');
	}

	// Retornamos el valor del contexto
	return context;
};
