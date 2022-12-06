import '@/styles/EditorSideBar.css';
import { useContext } from 'react';
import Button from '@/components/Button';
import FileContext from '@/context/FileContext';

function EditorSideBar(): JSX.Element {
	const { currentFile } = useContext(FileContext);

	const structureWords = [
		'elinicio',
		'elfin',
		'iniciobody',
		'finbody',
		'7var',
		'7varfin',
	];

	const reserverdWords = ['7print', '7echale'];

	const typesWords = ['7int', '7string', '7bool'];

	const controlWords = ['7if', '7else', '7endif', '7for', '7finfor'];

	const handleCode = (): void => {
		let missingStructureWords: string[] = [];
		const incorrectOrderWords: string[] = [];
		const errorMessages: string[] = [];
		// check missing structure words
		missingStructureWords = structureWords.filter(
			word => !(currentFile?.code?.includes(word) ?? false),
		);

		// check if all lines of codes that includes ends with |SIU|.
		const noCommentsCode = currentFile?.code
			.replace(/\/\*[\s\S]*?\*\//g, '')
			.split('	')
			.filter(line => line !== '');
		const linesWithReservedWords = noCommentsCode?.filter(line =>
			reserverdWords.some(word => line.includes(word)),
		);
		const linesWithReservedWordsNotEndingWithSIU =
			linesWithReservedWords?.filter(line => {
				if (line.endsWith('|SIU|') || line.endsWith('|SIU|\r\n')) {
					return false;
				}
				return true;
			});
		console.log(linesWithReservedWordsNotEndingWithSIU);
		if (linesWithReservedWordsNotEndingWithSIU != null) {
			if (linesWithReservedWordsNotEndingWithSIU.length > 0) {
				errorMessages.push(
					'Las lineas de codigo que contienen palabras reservadas deben terminar con |SIU|',
				);
			}
		}

		// delete all the spaces in the code
		const code = currentFile?.code.replace(/\s/g, '');
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
					'No se pueden usar palabras estructurales o reservadas entre la zona de variables',
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
					'No se pueden usar palabras estructurales en la zona del body',
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
					'La palabra estructural elinicio debe ir antes que la palabra estructural elfin',
				);
			}
		}

		// check if elinicio is before 7var and iniciobody
		if (elinicioIndex != null && varStartIndex != null) {
			if (elinicioIndex > varStartIndex) {
				incorrectOrderWords.push('elinicio');
				errorMessages.push(
					'La palabra estructural elinicio debe ir antes que la palabra estructural 7var',
				);
			}
		}
		if (elinicioIndex != null && bodyStartIndex != null) {
			if (elinicioIndex > bodyStartIndex) {
				incorrectOrderWords.push('elinicio');
				errorMessages.push(
					'La palabra estructural elinicio debe ir antes que la palabra estructural iniciobody',
				);
			}
		}

		// check if 7var and 7varfin are before iniciobody
		if (varStartIndex != null && bodyStartIndex != null) {
			if (varStartIndex > bodyStartIndex) {
				incorrectOrderWords.push('7var');
				errorMessages.push(
					'La palabra estructural 7var debe ir antes que la palabra estructural iniciobody',
				);
			}
		}
		if (varEndIndex != null && bodyStartIndex != null) {
			if (varEndIndex > bodyStartIndex) {
				incorrectOrderWords.push('7varfin');
				errorMessages.push(
					'La palabra estructural 7varfin debe ir antes que la palabra estructural iniciobody',
				);
			}
		}

		if (missingStructureWords.length > 0) {
			errorMessages.push(
				`Faltan las palabras estructurales: ${missingStructureWords.join(
					', ',
				)}`,
			);
		}

		if (incorrectOrderWords.length > 0) {
			errorMessages.push(
				`Por favor, verifica el orden de las siguientes palabras estructurales: ${incorrectOrderWords.join(
					', ',
				)}`,
			);
		}

		console.log('missingStructureWords', missingStructureWords);
		console.log('incorrectOrderWords', incorrectOrderWords);
		console.log('errorMessages', errorMessages);
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
				<Button>Fix problems</Button>
			</div>
		</div>
	);
}

export default EditorSideBar;
