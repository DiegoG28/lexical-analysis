import '@/styles/FilesSideBar.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from '@/components/Button';
import File from '@/components/File';

function FilesSideBar(): JSX.Element {
	return (
		<div className="FilesSideBar">
			<Button className="main-txt">
				Add <FontAwesomeIcon icon={faPlus} />
			</Button>
			<div className="files">
				<File>index.js</File>
				<File>exampleTest.js</File>
				<File>sidebar.js</File>
			</div>
		</div>
	);
}

export default FilesSideBar;
