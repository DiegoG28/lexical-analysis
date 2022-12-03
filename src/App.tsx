import '@/App.css';
import Editor from '@/components/Editor';
import FilesSideBar from '@/components/FilesSideBar';
import Menu from '@/components/Menu';

function App(): JSX.Element {
	return (
		<div className="App">
			<Menu />
			<FilesSideBar />
			<Editor />
		</div>
	);
}

export default App;
