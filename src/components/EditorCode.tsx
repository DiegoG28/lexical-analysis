import Editor, { useMonaco } from '@monaco-editor/react';
import { useEffect, useContext, useState } from 'react';
import FileContext from '@/context/FileContext';
import '@/styles/EditorCode.css';

function EditorCode(): JSX.Element {
	const monaco = useMonaco();
	const [code, setCode] = useState('');
	const { files } = useContext(FileContext);

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

	useEffect(() => {
		if (files.length > 0) {
			setCode(files[0].code);
		}
	}, [files]);

	return (
		<div className="EditorCode">
			{monaco !== null ? (
				<Editor
					height="100%"
					theme="independence"
					language="javascript"
					value={code}
				/>
			) : null}
		</div>
	);
}

export default EditorCode;
