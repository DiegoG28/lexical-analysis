import '@/styles/EditorConsole.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import TerminalContext from '@/context/TerminalContext';

function EditorConsole(): JSX.Element {
	const { output } = useContext(TerminalContext);
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
			<div className="EditorConsole__body txt">
				{output.map((message, index) => (
					<div
						key={`message-${index}`}
						className="EditorConsole__body__message"
					>
						{message}
					</div>
				))}
			</div>
		</div>
	);
}

export default EditorConsole;
