import '@/styles/Editor.css';
import EditorCode from '@/components/EditorCode';
import EditorConsole from '@/components/EditorConsole';
import EditorSideBar from '@/components/EditorSideBar';
import EditorTabs from '@/components/EditorTabs';

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
