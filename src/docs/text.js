import React, { useEffect, useRef } from 'react';
import useRegex from '../lib/index';

const placeholder = '注音輸入中文';
const type = 'text';
const options = {};

const TextInput = () => {
	const ref = useRef();
	const [value, onChange] = useRegex({ type, options });

	useEffect(() => {
		ref.current.value = value[0];
	}, [value]);

	return <input {...{ type, placeholder, onChange, ref }} />;
};
export default TextInput;
