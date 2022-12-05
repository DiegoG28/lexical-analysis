import '@/styles/Button.css';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface Props {
	children: React.ReactNode;
	type?: 'file' | undefined;
	onClick?: () => void;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function Button(props: Props): JSX.Element {
	const { children, type, onClick, onChange } = props;

	const fileButton = (
		<div>
			<input
				type="file"
				id="files"
				style={{ display: 'none' }}
				onChange={onChange}
			/>
			<label htmlFor="files" className="Button fire-background main-txt">
				<p>{children}</p>
				<FontAwesomeIcon icon={faPlus} />
			</label>
		</div>
	);

	const submitButton = (
		<button
			type="submit"
			className="Button fire-background main-txt-sm"
			onClick={onClick}
		>
			{children}
		</button>
	);

	return type === 'file' ? fileButton : submitButton;
}

export default Button;
