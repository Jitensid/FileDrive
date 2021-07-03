import React, { createContext, useState } from 'react';

const SnackbarContext = createContext();

const SnackbarContextProvider = ({ children }) => {
	const initialsnackbarstate = {
		open: false,
		message: '',
	};

	const [snackbarstate, setsnackbarstate] = useState(initialsnackbarstate);

	return (
		<SnackbarContext.Provider value={{ snackbarstate, setsnackbarstate }}>
			{children}
		</SnackbarContext.Provider>
	);
};

export { SnackbarContext };
export { SnackbarContextProvider };
