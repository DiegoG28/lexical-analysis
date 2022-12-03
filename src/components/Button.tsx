import '@/styles/Button.css';

interface Props {
	children: React.ReactNode;
	className?: string;
}

function Button(props: Props): JSX.Element {
	const { children, className } = props;

	return (
		<button className={`Button fire-background ${className}`}>
			{children}
		</button>
	);
}

export default Button;
