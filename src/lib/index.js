import { useState, useEffect, useRef } from 'react';

const useCountdown = (initialState = defaultProps) => {
	const [value, setValue] = useState(initialState);
	const [state, setState] = useState(value);

	useEffect(() => {}, [value]);

	return [
		state,
		(e) => {
			console.log(e);
		},
	];
};

export { useCountdown };
export default useCountdown;
