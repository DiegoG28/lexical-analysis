import '@/styles/EditorTabs.css';
import Tab from '@/components/Tab';

function EditorTabs(): JSX.Element {
	return (
		<div className="EditorTabs">
			<Tab>index.js</Tab>
			<Tab>exampleTest.js</Tab>
			<Tab>sidebar.js</Tab>
		</div>
	);
}

export default EditorTabs;
