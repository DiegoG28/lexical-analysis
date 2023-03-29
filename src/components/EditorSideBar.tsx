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
		const START_PROGRAM = 'elinicio';
		const END_PROGRAM = 'elfin';
		const START_VAR_ZONE = 'sietevar';
		const END_VAR_ZONE = 'sietevarfin';
		const START_BODY_ZONE = 'iniciobody';
		const END_BODY_ZONE = 'finbody';

		const errors: IError[] = [];
		const stack: string[] = [];

		if (!sourceCode) return;

		const lines = sourceCode.split('\n');
		const startLine = lines.findIndex(line => line.trim() === START_PROGRAM);

		if (startLine === -1) {
			errors.push({
				type: 'sintaxis',
				message: `Se esperaba la palabra clave '${START_PROGRAM}' al inicio del programa`,
				line: 1,
			});
		}
		stack.push(START_PROGRAM);

		let isVarSintaxCorrect = true;
		let isBodySintaxCorrect = true;

		for (let i = startLine + 1; i < lines.length; i++) {
			const line = lines[i].trim();
			console.log(stack);

			if (line === START_VAR_ZONE) {
				if (isVarSintaxCorrect) stack.push(START_VAR_ZONE);
			} else if (line === END_VAR_ZONE) {
				if (stack[stack.length - 1] !== START_VAR_ZONE) {
					errors.push({
						type: 'sintaxis',
						message: `Se esperaba la palabra clave '${START_VAR_ZONE}' antes de '${END_VAR_ZONE}'`,
						line: i + 1,
					});
					isVarSintaxCorrect = false;
				} else {
					stack.pop();
					stack.push(END_VAR_ZONE);
				}
			} else if (line === START_BODY_ZONE) {
				if (isVarSintaxCorrect) {
					if (stack[stack.length - 1] !== END_VAR_ZONE) {
						errors.push({
							type: 'sintaxis',
							message: `Se esperaba la palabra clave '${END_VAR_ZONE}' antes de '${START_BODY_ZONE}'`,
							line: i + 1,
						});
						isBodySintaxCorrect = false;
					} else if (isBodySintaxCorrect) {
						stack.pop();
						stack.push(START_BODY_ZONE);
					}
				} else {
					const stackHasEndBody = stack.find(
						keyword => keyword === END_BODY_ZONE,
					);
					if (stackHasEndBody) {
						errors.push({
							type: 'sintaxis',
							message: `Se esperaba la palabra clave '${START_BODY_ZONE}' antes de '${END_BODY_ZONE}'`,
							line: i + 1,
						});
						isBodySintaxCorrect = false;
					} else if (isBodySintaxCorrect) {
						stack.push(START_BODY_ZONE);
					}
				}
			} else if (line === END_BODY_ZONE) {
				if (
					stack[stack.length - 1] !== START_BODY_ZONE &&
					isBodySintaxCorrect
				) {
					errors.push({
						type: 'sintaxis',
						message: `Se esperaba la palabra clave '${START_BODY_ZONE}' antes de '${END_BODY_ZONE}'`,
						line: i + 1,
					});
					isBodySintaxCorrect = false;
				} else {
					stack.pop();
				}
			} else if (line === END_PROGRAM) {
				if (stack[stack.length - 1] !== START_PROGRAM && stack.length > 0) {
					errors.push({
						type: 'sintaxis',
						message: `Se esperaba la palabra clave '${START_PROGRAM}' antes de '${END_PROGRAM}'`,
						line: i + 1,
					});
				} else {
					stack.pop();
				}
			}
		}

		if (stack.length > 0) {
			stack.forEach(keyword => {
				errors.push({
					type: 'sintaxis',
					message: `Se esperaba la palabra clave '${keyword}' correspondiente`,
					line: lines.length,
				});
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
