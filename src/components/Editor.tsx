import '@/styles/Editor.css';
import EditorCode from '@/components/EditorCode';
import EditorConsole from '@/components/EditorConsole';
import EditorSideBar from '@/components/EditorSideBar';
import EditorTabs from '@/components/EditorTabs';
import { TerminalProvider } from '@/context/TerminalContext';

function Editor(): JSX.Element {
	return (
		<div className="Editor">
			<EditorTabs />
			<TerminalProvider>
				<div className="wrapper">
					<EditorCode />
					<EditorSideBar />
				</div>
				<EditorConsole />
			</TerminalProvider>
		</div>
	);
}

export default Editor;
