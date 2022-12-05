import '@/styles/File.css';
import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import FileContext, { IFile } from '@/context/FileContext';

interface Props {
	file: IFile;
}

function File(props: Props): JSX.Element {
	const { file } = props;
	const { currentFile, selectFile } = useContext(FileContext);
	const isActive = currentFile?.name === file.name;
	return (
		<div
			className={`File txt ${isActive ? 'active' : ''}`}
			onClick={() => selectFile(file)}
		>
			<FontAwesomeIcon icon={faFile} />
			<p>{file.name}</p>
		</div>
	);
}

export default File;
