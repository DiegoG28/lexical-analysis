import '@/styles/Tab.css';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface Props {
	children: React.ReactNode;
}

function Tab(props: Props): JSX.Element {
	const { children } = props;

	return (
		<div className="Tab txt" tabIndex={-2}>
			{children}
			<FontAwesomeIcon icon={faXmark} />
		</div>
	);
}

export default Tab;
