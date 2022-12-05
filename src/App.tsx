import '@/App.css';
import Editor from '@/components/Editor';
import FilesSideBar from '@/components/FilesSideBar';
import Menu from '@/components/Menu';
import CodeContext from '@/context/CodeContext';
import useCode from '@/hooks/useCode';

function App(): JSX.Element {
	const code = useCode();

	return (
		<CodeContext.Provider value={code}>
			<div className="App">
				<Menu />
				<FilesSideBar />
				<Editor />
			</div>
		</CodeContext.Provider>
	);
}

export default App;
