import '@/styles/File.css';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	children: React.ReactNode;
}

function File(props: Props): JSX.Element {
	const { children } = props;
	return (
		<div className="File txt" tabIndex={-1}>
			<FontAwesomeIcon icon={faFile} />
			<p>{children}</p>
		</div>
	);
}

export default File;
