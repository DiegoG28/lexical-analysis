/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-regex-literals */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
import '@/styles/EditorSideBar.css';
import { useContext } from 'react';
import Button from '@/components/Button';
import FileContext from '@/context/FileContext';
import TerminalContext from '@/context/TerminalContext';

function EditorSideBar(): JSX.Element {
	const { currentFile } = useContext(FileContext);
	const { addOutput } = useContext(TerminalContext);

	const structureWords = [
		'elinicio',
		'elfin',
		'iniciobody',
		'finbody',
		'7var',
		'7varfin',
	];

	const reserverdWords = ['7print', '7echale'];

	const typesWords = ['7num', '7string', '7bool'];

	const controlWords = ['7if', '7else', '7endif', '7for', '7finfor'];

	const supportedCharacters = new RegExp(
		/\w|\s|\(|\)|\{|\}|\[|\]|\.|,|;|:|\+|-|\*|\/|=|>|<|!|&|\||\?|\||'|`|"|%||''|' '|7var|\$/gm,
	);

	const handleCode = (): void => {
		let missingStructureWords: string[] = [];
		const incorrectOrderWords: string[] = [];
		const errorMessages: string[] = [];
		// check missing structure words
		missingStructureWords = structureWords.filter(
			word => !(currentFile?.code?.includes(word) ?? false),
		);

		// convert code to array if includes \r\n
		const codeArray = currentFile?.code?.split('\r\n');
		// check if all lines of code array that are not comments and includes reserved words or types words ends with |SIU|
		const noCommentsCodeArray = codeArray?.filter(line => {
			if (line.includes('/*') && line.includes('*/')) {
				return false;
			}
			return true;
		});
		const linesWithReservedWords = noCommentsCodeArray?.filter(line =>
			reserverdWords.some(word => line.includes(word)),
		);
		const linesWithoutEnd = linesWithReservedWords?.filter(line => {
			if (line.endsWith('|SIU|') || line.endsWith('|SIU|\r\n')) {
				return false;
			}
			return true;
		});

		// get number lines with words thar are not end with |SIU| from code array
		const numbersLineWithoudEnd = linesWithoutEnd?.map(
			line => codeArray!.indexOf(line) + 1,
		);
		if (linesWithoutEnd != null) {
			if (linesWithoutEnd.length > 0) {
				errorMessages.push(
					`Error de línea. Las siguientes líneas de código no terminan con |SIU|: ${numbersLineWithoudEnd?.join(
						',',
					)}`,
				);
			}
		}

		// check if the code array doesn't have not supported characters
		const linesWithNotSupportedChar = codeArray?.filter(line => {
			if (
				(line.includes('/*') && line.includes('*/')) ||
				line.includes('\t') ||
				line.includes('elfin')
			) {
				return false;
			}
			return !supportedCharacters.test(line);
		});
		// get number lines with not supported characters from code array
		const numbersLineWithNotSupportedChar = linesWithNotSupportedChar?.map(
			line => codeArray!.indexOf(line) + 1,
		);
		if (linesWithNotSupportedChar != null) {
			if (linesWithNotSupportedChar.length > 0) {
				errorMessages.push(
					`Caracter inválido. Las siguientes líneas de código contienen caracteres no soportados: ${numbersLineWithNotSupportedChar?.join(
						',',
					)}`,
				);
			}
		}
		// delete all the spaces, tabs and break lines from the code
		const code = currentFile?.code
			.replace(/ /g, '')
			.replace(/\t/g, '')
			.replace(/\r\n/g, '');
		// delete all comments from the code. The comments are between /* and */
		const codeWithoutComments = code?.replace(/\/\*[\s\S]*?\*\//g, '');

		// get code between the variable zone
		const varStartIndex = codeWithoutComments?.indexOf('7var');
		const varEndIndex = codeWithoutComments?.indexOf('7varfin');
		if (varStartIndex != null && varEndIndex != null) {
			const codeBetweenVar = codeWithoutComments?.slice(
				varStartIndex,
				varEndIndex,
			);
			// check if there are not structure words or reserved words in the variable zone
			const structureWordsBetweenVar = structureWords.filter(word => {
				if (word === '7varfin' || word === '7var') {
					return false;
				}
				return codeBetweenVar?.includes(word);
			});
			const reserverdWordsBetweenVar = reserverdWords.filter(word => {
				if (word === '7varfin' || word === '7var') {
					return false;
				}
				return codeBetweenVar?.includes(word);
			});
			if (
				structureWordsBetweenVar.length > 0 ||
				reserverdWordsBetweenVar.length > 0
			) {
				errorMessages.push(
					'Error de sintaxis. No se pueden usar palabras estructurales o reservadas entre la zona de variables',
				);
			}
		}

		// check if there are not structure words in the body zone
		const bodyStartIndex = codeWithoutComments?.indexOf('iniciobody');
		const bodyEndIndex = codeWithoutComments?.indexOf('finbody');
		if (bodyStartIndex != null && bodyEndIndex != null) {
			const codeBetweenBody = codeWithoutComments?.slice(
				bodyStartIndex,
				bodyEndIndex,
			);
			const structureWordsBetweenBody = structureWords.filter(word => {
				if (word === 'iniciobody' || word === 'finbody') {
					return false;
				}
				return codeBetweenBody?.includes(word);
			});
			if (structureWordsBetweenBody.length > 0) {
				incorrectOrderWords.push('iniciobody');
				errorMessages.push(
					'Error de sintaxis. No se pueden usar palabras estructurales en el cuerpo del programa',
				);
			}
		}

		// check if elinicio is first and elfin is last
		const elinicioIndex = codeWithoutComments?.indexOf('elinicio');
		const elfinIndex = codeWithoutComments?.indexOf('elfin');
		if (elinicioIndex != null && elfinIndex != null) {
			if (elinicioIndex > elfinIndex) {
				incorrectOrderWords.push('elinicio');
				errorMessages.push(
					'Error de sintaxis. El inicio del programa debe ir antes que el fin del programa',
				);
			}
		}

		// check if elinicio is before 7var and iniciobody
		if (elinicioIndex != null && varStartIndex != null) {
			if (elinicioIndex > varStartIndex) {
				incorrectOrderWords.push('elinicio');
				errorMessages.push(
					'Error de sintaxis. El inicio del programa debe ir antes que la zona de variables',
				);
			}
		}
		if (elinicioIndex != null && bodyStartIndex != null) {
			if (elinicioIndex > bodyStartIndex) {
				incorrectOrderWords.push('elinicio');
				errorMessages.push(
					'Error de sintaxis. El inicio del programa debe ir antes que el cuerpo del programa',
				);
			}
		}

		// check if 7var and 7varfin are before iniciobody
		if (varStartIndex != null && bodyStartIndex != null) {
			if (varStartIndex > bodyStartIndex) {
				incorrectOrderWords.push('7var');
				errorMessages.push(
					'Error de sintaxis. La zona de variables debe ir antes que el cuerpo del programa',
				);
			}
		}
		if (varEndIndex != null && bodyStartIndex != null) {
			if (varEndIndex > bodyStartIndex) {
				incorrectOrderWords.push('7varfin');
				errorMessages.push(
					'Error de sintaxis. La palabra 7varfin debe ir antes que el cuerpo del programa',
				);
			}
		}

		if (missingStructureWords.length > 0) {
			errorMessages.push(
				`Error de sintaxis. Faltan las palabras: ${missingStructureWords.join(
					', ',
				)}`,
			);
		}

		if (incorrectOrderWords.length > 0) {
			errorMessages.push(
				`Por favor, verifica el orden de las siguientes palabras: ${incorrectOrderWords.join(
					', ',
				)}`,
			);
		}

		if (errorMessages.length > 0) {
			addOutput(errorMessages);
		} else {
			addOutput([
				'No se encontraron errores',
				codeWithoutComments as string,
			]);
		}
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
				<Button onClick={handleCode}>Analyze code</Button>
			</div>
		</div>
	);
}

export default EditorSideBar;
