import '@/styles/EditorConsole.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTerminal } from '@/hooks/useTerminal';

function EditorConsole(): JSX.Element {
	const terminal = useTerminal();
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
				{terminal.output.map((message, index) => (
					<div
						key={`message-${index}`}
						className="EditorConsole__body__message"
					>
						{`${message.type}  ${message.message}  ${message.line}`}
					</div>
				))}
			</div>
		</div>
	);
}

export default EditorConsole;
