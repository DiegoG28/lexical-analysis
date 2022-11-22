import '../styles/Editor.css';
import EditorCode from './EditorCode';
import EditorConsole from './EditorConsole';
import EditorSideBar from './EditorSideBar';
import EditorTabs from './EditorTabs';

function Editor(): JSX.Element {
	return (
		<div className="Editor">
			<EditorTabs />
			<div className="wrapper">
				<EditorCode />
				<EditorSideBar />
			</div>
			<EditorConsole />
		</div>
	);
}

export default Editor;
