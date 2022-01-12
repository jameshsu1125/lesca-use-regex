import React, { useEffect, useRef } from 'react';
import useRegex from '../lib/index';

const type = 'email';
const placeholder = 'you@host.com';

const Email = () => {
	const [value, onChange] = useRegex({ type });
	const ref = useRef();

	useEffect(() => {
		const [result, , isPass] = value;
		ref.current.value = result;

		if (isPass) ref.current.classList.add('checked');
		else ref.current.classList.remove('checked');
	}, [value]);

	return (
		<>
			<input {...{ ref, placeholder, type, onChange }} />
		</>
	);
};
export default Email;
