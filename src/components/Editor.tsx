import '@/styles/Editor.css';
import EditorCode from '@/components/EditorCode';
import EditorConsole from '@/components/EditorConsole';
import EditorSideBar from '@/components/EditorSideBar';
import EditorTabs from '@/components/EditorTabs';
import TerminalContext from '@/context/TerminalContext';
import useTerminal from '@/hooks/useTerminal';

function Editor(): JSX.Element {
	const terminal = useTerminal();
	return (
		<div className="Editor">
			<EditorTabs />
			<TerminalContext.Provider value={terminal}>
				<div className="wrapper">
					<EditorCode />
					<EditorSideBar />
				</div>
				<EditorConsole />
			</TerminalContext.Provider>
		</div>
	);
}

export default Editor;
