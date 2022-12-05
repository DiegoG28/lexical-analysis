import '@/styles/EditorTabs.css';
import { useContext } from 'react';
import Tab from '@/components/Tab';
import FileContext from '@/context/FileContext';

function EditorTabs(): JSX.Element {
	const { files } = useContext(FileContext);

	return (
		<div className="EditorTabs">
			{files.map((file, index) => (
				<Tab key={`tab-${index}`} file={file} />
			))}
		</div>
	);
}

export default EditorTabs;
