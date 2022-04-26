import { Button, ButtonGroup } from '@mui/material';
import { useEffect, useState } from 'react';

const items = [
  { type: 'text', placeholder: 'Your Name' },
  { type: 'tel', placeholder: '09' },
  { type: 'email', placeholder: 'abc@host.com' },
];

const Demo = () => {
  useEffect(() => {}, []);
  return (
    <div className='Demo'>
      <h2>Demo</h2>

      <ButtonGroup variant='contained'>
        <Button>click</Button>
      </ButtonGroup>
    </div>
  );
};
export default Demo;
