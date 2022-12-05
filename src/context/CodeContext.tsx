import React from 'react';

const CodeContext = React.createContext(
	[] as unknown as [string, (value: string) => void],
);

export default CodeContext;
