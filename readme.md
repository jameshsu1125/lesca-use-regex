[![dev by JamesHsu](https://img.shields.io/badge/Dev%20by-Jameshsu1125-green)](https://github.com/jameshsu1125/) [![made in Taiwan](https://img.shields.io/badge/Made%20in-Taiwan-orange)](https://github.com/jameshsu1125/)

# Installation

```sh
npm install lesca-use-regex --save
```

# Usage

## 文字正則

```javascript
import { useEffect, useRef } from 'react';
import useRegex from 'lesca-use-regex';

const placeholder = '注音輸入中文';

// type = text
const type = 'text';
// tw = 支援注音輸入(預設), en => 是否支援要英文, number => 是否支援數字
const options = { tw: true, en: false, number: false };

const myComponent = () => {
	const ref = useRef();

	const [value, onChange] = useRegex({ type, options });

	// 正則結果不同才會更新
	useEffect(() => {
		ref.current.value = value[0];
	}, [value]);

	return <input {...{ type, placeholder, onChange, ref }} />;
};
export default myComponent;
```

## 電話號碼正則

```javascript
import { useEffect, useRef } from 'react';
import useRegex from 'lesca-use-regex';

const placeholder = '09xxxxxxxxx';

// type = tel
const type = 'tel';

const myComponent = () => {
	const ref = useRef();
	const [value, onChange] = useRegex({ type });

	// 正則結果不同才會更新
	useEffect(() => {
		const [result, , isPass] = value;
		ref.current.value = result;

		// 如果無誤
		if (isPass) ref.current.classList.add('checked');
		else ref.current.classList.remove('checked');
	}, [value]);

	return <input {...{ type, placeholder, onChange, ref }} />;
};
export default myComponent;
```

## Email 格式正則

```javascript
import { useEffect, useRef } from 'react';
import useRegex from 'lesca-use-regex';

const placeholder = 'you@host.com';

// type = tel
const type = 'email';

const myComponent = () => {
	const ref = useRef();
	const [value, onChange] = useRegex({ type });

	// 正則結果不同才會更新
	useEffect(() => {
		const [result, , isPass] = value;
		ref.current.value = result;

		// 如果無誤
		if (isPass) ref.current.classList.add('checked');
		else ref.current.classList.remove('checked');
	}, [value]);

	return <input {...{ type, placeholder, onChange, ref }} />;
};
export default myComponent;
```

# Methods

| method                                      |                                 options                                 |     description      |                                                default |
| :------------------------------------------ | :---------------------------------------------------------------------: | :------------------: | -----------------------------------------------------: |
| useRegex( { type, options, defaultValue } ) | [type](###type), [options](###options), [defaultValue](###defaultValue) | 用法跟 useState 一樣 | { type:'text', options: { tw:true }, defaultValue:'' } |

### type

| Properties |  type  |                     description                      | default |
| :--------- | :----: | :--------------------------------------------------: | ------: |
| text       | string | 跟 input type 一樣，主要有三種'text', 'tel', 'email' |  "text" |

### options

| Properties |  type  |        description        |                              default |
| :--------- | :----: | :-----------------------: | -----------------------------------: |
| options    | object | 目前只有 type=text 需要帶 | { tw: true, en: false, number:false} |

### defaultValue

| Properties   |  type  | description | default |
| :----------- | :----: | :---------: | ------: |
| defaultValue | string |   初始化    |      "" |
