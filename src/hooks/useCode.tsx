import { useState } from 'react';

const useCode = (initialValue: string): [string, (value: string) => void] => {
	const [code, setCode] = useState(initialValue);

	return [code, setCode];
};

export default useCode;
