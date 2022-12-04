import '@/styles/EditorSideBar.css';
import Button from '@/components/Button';

function EditorSideBar(): JSX.Element {
	return (
		<div className="EditorSideBar">
			<div className="EditorSideBar__header">
				<div className="EditorSideBar__header__title main-txt">
					Debugger
				</div>
			</div>
			<div className="EditorSideBar__content txt">
				<p>Analyze your code to find issues.</p>
				<Button>Analyze code</Button>
				<Button>Fix problems</Button>
			</div>
		</div>
	);
}

export default EditorSideBar;
