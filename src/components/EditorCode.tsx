import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useContext } from 'react';
import FileContext from '@/context/FileContext';
import '@/styles/EditorCode.css';

function EditorCode(): JSX.Element {
	const monaco = useMonaco();
	const { currentFile } = useContext(FileContext);

	useEffect(() => {
		if (monaco !== null) {
			monaco.editor.defineTheme('independence', {
				base: 'vs-dark',
				inherit: true,
				rules: [],
				colors: {
					'editor.background': '#3a405a',
					'editor.lineHighlightBackground': '#30344B',
					'scrollbarSlider.background': '#282c3e',
					'scrollbarSlider.hoverBackground': '#282c3e',
					'scrollbarSlider.activeBackground': '#282c3e',
				},
			});
		}
	}, [monaco]);

	return (
		<div className="EditorCode">
			{monaco !== null ? (
				<Editor
					height="100%"
					theme="independence"
					language="javascript"
					value={currentFile?.code}
				/>
			) : null}
		</div>
	);
}

export default EditorCode;
