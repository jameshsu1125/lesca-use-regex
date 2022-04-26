import React from 'react';
import { render } from 'react-dom';
import Email from './email';
import './styles.less';
import Tel from './tel';
import TextInput from './text';

function Demo() {
	return (
		<div className='app'>
			<div>
				<TextInput />
			</div>
			<div>
				<Tel />
			</div>
			<div>
				<Email />
			</div>
		</div>
	);
}

render(<Demo />, document.getElementById('app'));
