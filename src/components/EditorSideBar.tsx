import '@/styles/EditorSideBar.css';
import { useContext } from 'react';
import Button from '@/components/Button';
import FileContext from '@/context/FileContext';
import { useTerminal } from '@/hooks/useTerminal';

export interface IError {
	type: string;
	message: string;
	line: number;
}

function EditorSideBar(): JSX.Element {
	const { currentFile } = useContext(FileContext);
	const terminal = useTerminal();

	const handleCode = (sourceCode: string | undefined): void => {
		const start = 'elinicio';
		const end = 'elfin';
		const errors: IError[] = [];

		if (!sourceCode) return;

		const lines = sourceCode.split('\n');
		const startLine = lines.findIndex(line => line.trim() === start);
		const endLine = lines.findIndex(
			(line, index) => index > startLine && line.trim() === end,
		);

		if (startLine === -1) {
			errors.push({
				type: 'sintaxis',
				message: `Se esperaba la palabra clave '${start}' al inicio del programa`,
				line: 1,
			});
		}

		if (endLine === -1) {
			errors.push({
				type: 'sintaxis',
				message: `Se esperaba la palabra clave '${end}' al final del programa`,
				line: lines.length,
			});
		}
		terminal.addOutput(errors);
	};

	return (
		<div className="EditorSideBar">
			<div className="EditorSideBar__header">
				<div className="EditorSideBar__header__title main-txt">
					Debugger
				</div>
			</div>
			<div className="EditorSideBar__content txt">
				<p>Analyze your code to find issues.</p>
				<Button onClick={() => handleCode(currentFile?.code)}>
					Analyze code
				</Button>
			</div>
		</div>
	);
}

export default EditorSideBar;
