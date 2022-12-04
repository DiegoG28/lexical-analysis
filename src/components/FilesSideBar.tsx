import '@/styles/FilesSideBar.css';
import Button from '@/components/Button';
import File from '@/components/File';

function FilesSideBar(): JSX.Element {
	return (
		<div className="FilesSideBar">
			<Button type="file">Add</Button>
			<div className="FilesSideBar__files">
				<File>index.js</File>
				<File>exampleTest.js</File>
				<File>sidebar.js</File>
			</div>
		</div>
	);
}

export default FilesSideBar;
