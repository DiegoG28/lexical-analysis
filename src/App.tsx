import '@/App.css';
import Editor from '@/components/Editor';
import FilesSideBar from '@/components/FilesSideBar';
import Menu from '@/components/Menu';
import FileContext from '@/context/FileContext';
import useFile from '@/hooks/useFile';

function App(): JSX.Element {
	const file = useFile();

	return (
		<FileContext.Provider value={file}>
			<div className="App">
				<Menu />
				<FilesSideBar />
				<Editor />
			</div>
		</FileContext.Provider>
	);
}

export default App;
