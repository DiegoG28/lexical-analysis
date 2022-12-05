import '@/styles/FilesSideBar.css';
import { useContext } from 'react';
import Button from '@/components/Button';
import File from '@/components/File';
import FileContext from '@/context/FileContext';

function FilesSideBar(): JSX.Element {
	const { files, addFile } = useContext(FileContext);

	const handleFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const file = e.target.files?.[0];
		if (file != null) {
			const reader = new FileReader();
			reader.onload = e => {
				const text = e.target?.result;
				if (text != null) {
					const newFile = {
						name: file.name,
						code: text.toString(),
					};
					addFile(newFile);
				}
			};
			reader.readAsText(file);
		}
	};

	return (
		<div className="FilesSideBar">
			<Button type="file" onChange={handleFile}>
				Add
			</Button>
			<div className="FilesSideBar__files">
				{files.map((file, index) => (
					<File key={`file-${index}`} file={file} />
				))}
			</div>
		</div>
	);
}

export default FilesSideBar;
