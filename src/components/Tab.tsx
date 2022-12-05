import '@/styles/Tab.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useContext } from 'react';
import FileContext, { IFile } from '@/context/FileContext';

interface Props {
	file: IFile;
}

function Tab(props: Props): JSX.Element {
	const { file } = props;
	const { currentFile, selectFile } = useContext(FileContext);
	const isActive = currentFile?.name === file.name;

	return (
		<div
			className={`Tab txt ${isActive ? 'active' : ''}`}
			onClick={() => selectFile(file)}
		>
			{file.name}
			<FontAwesomeIcon icon={faXmark} />
		</div>
	);
}

export default Tab;
