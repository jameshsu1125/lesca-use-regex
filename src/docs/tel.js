import React, { useEffect, useRef } from 'react';
import useRegex from '../lib/index';

const placeholder = '09xxxxxxxxx';
const type = 'tel';

const Tel = () => {
	const ref = useRef();
	const [value, onChange] = useRegex({ type });

	useEffect(() => {
		const [result, , isPass] = value;
		ref.current.value = result;
		if (isPass) ref.current.classList.add('checked');
		else ref.current.classList.remove('checked');
	}, [value]);

	return <input {...{ ref, onChange, type, placeholder }} />;
};
export default Tel;
