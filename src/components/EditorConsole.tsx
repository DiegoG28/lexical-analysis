import '@/styles/EditorConsole.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function EditorConsole(): JSX.Element {
	return (
		<div className="EditorConsole">
			<div className="EditorConsole__header">
				<div className="EditorConsole__header__title main-txt">
					Terminal
				</div>
				<div className="EditorConsole__header__buttons">
					<FontAwesomeIcon icon={faXmark} />
				</div>
			</div>
		</div>
	);
}

export default EditorConsole;
