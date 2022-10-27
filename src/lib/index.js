import { useState, useEffect, useRef } from 'react';

const defaultOptions = {
  text: { tw: true, en: false, number: false },
  tel: { country: 'TW' },
  email: {},
};

const defaultInitialState = { type: 'text', defaultValue: '', options: {} };

const textPatterns = {
  text: {
    tw: '^[\u4E00-\u9FA5_\u3105-\u3129\u02CA\u02C7\u02CB\u02D9\u02c9]+$',
    number: '^[0-9]+$',
    en: '^[a-zA-Z]+$',
  },
  tel: { TW: /^09[0-9]{8}$/ },
  email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
};

const useRegex = (initialState) => {
  const pattern = useRef();
  const opt = { ...defaultInitialState, ...initialState };
  const { defaultValue } = opt;
  const [state, setState] = useState([defaultValue, defaultValue]);

  useEffect(() => {
    const { type, options } = opt;

    if (type !== 'text' && type !== 'tel' && type !== 'email') {
      console.log(
        `%c[useRegex:invaild type] Should be 'text', 'tel' or 'email'`,
        'color: #f60; font-size:12px;',
      );
      return;
    }

    let setting = {};
    setting = { ...defaultOptions[type], ...options };

    switch (type) {
      case 'text':
        const { text } = textPatterns;
        pattern.current = Object.entries(setting)
          .map((e) => {
            const [k, v] = e;
            if (v) return text[k];
          })
          .filter((e) => e);

        break;

      case 'tel':
        const { tel } = textPatterns;
        const { country } = setting;
        pattern.current = tel[country];
        break;

      case 'email':
        const { email } = textPatterns;
        pattern.current = email;
        break;
    }
  }, []);

  return [
    state,
    (e) => {
      const { value } = e.target;
      const { type } = opt;

      switch (type) {
        case 'text':
          const regex = new RegExp(pattern.current.join('|'), 'gi');
          const match = value.match(regex);
          if (match === null) {
            const char = value.split('').filter((e) => {
              if (e.match(regex) === null) return false;
              return true;
            });
            if (char.length !== 0) {
              const result = char.reduce((a, c) => a + c);
              setState([result, value]);
            } else {
              setState(['', value]);
            }
          }
          break;
        case 'tel':
          if (value.length === 1) {
            if (value !== '0') setState(['', value, false]);
            else setState([value, value, false]);
          } else if (value.length === 2) {
            if (value !== '09') setState(['0', value, false]);
            else setState([value, value, false]);
          } else if (value.length > 10) {
            const res = value.slice(0, 10);
            setState([res, value, pattern.current.test(res)]);
          } else {
            const r = /^[0-9]$/;
            const l = value.slice(-1);
            const b = r.test(l);
            if (!b) {
              setState([value.slice(0, -1), value, pattern.current.test(value)]);
            } else setState([value, value, pattern.current.test(value)]);
          }
          break;
        case 'email':
          const result = pattern.current.test(value);

          const [username, host] = value.split('@');
          const hasAt = value.indexOf('@') > 0;
          const hasDot = host?.split('.')[1] !== undefined;

          const data = { user: '', host: '', local: '' };
          const reg = {
            user: /[A-Za-z0-9_\-\.]$/,
            host: /[A-Za-z0-9_\-\.]$/,
            local: /([A-Za-z])$/,
          };

          if (username) {
            const char = username.split('').filter((e) => reg.user.test(e));
            data.user = char.reduce((a, c) => a + c, '');
          }
          if (host) {
            const [hostname, localname] = host.split('.');

            if (hostname) {
              const char = hostname.split('').filter((e) => reg.host.test(e));
              data.host = char.reduce((a, c) => a + c, '');
            }

            if (localname) {
              const char = localname.split('').filter((e) => reg.local.test(e));
              data.local = char.reduce((a, c, i) => {
                if (i < 3) return a + c;
                else return a;
              }, '');
            }
          }

          const exValue = `${data.user}${hasAt ? '@' : ''}${data.host}${hasDot ? '.' : ''}${
            data.local
          }`;

          setState([exValue, value, result]);

          break;
      }
    },
  ];
};

export { useRegex };
export default useRegex;
