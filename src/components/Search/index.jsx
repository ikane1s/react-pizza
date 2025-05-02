import React, { useContext } from 'react';
import debounce from 'lodash.debounce';

import styles from './Search.module.scss';
import { SearchContext } from '../../App';

const Search = () => {
  const [value, setValue] = React.useState('');
  const { setSearchValue } = React.useContext(SearchContext);
  const inputRef = React.useRef();

  function onClickClear() {
    setSearchValue('');
    setValue('');
    inputRef.current.focus();
  }

  const onChangeInput = (e) => {
    setValue(e.target.value);
    updateSearchValue(e.target.value);
  };

  const updateSearchValue = React.useCallback(
    debounce((str) => {
      setSearchValue(str);
    }, 300),
    [],
  );

  return (
    <div className={styles.root}>
      <svg
        className={styles.icon}
        enable-background="new 0 0 32 32"
        id="Layer_1"
        version="1.1"
        viewBox="0 0 32 32"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g>
          <path d="M13,2C6.935,2,2,6.935,2,13s4.935,11,11,11s11-4.935,11-11S19.065,2,13,2z M13,22c-4.962,0-9-4.037-9-9   c0-4.962,4.038-9,9-9c4.963,0,9,4.038,9,9C22,17.963,17.963,22,13,22z" />
          <path d="M29.707,28.293l-6.001-6c-0.391-0.391-1.023-0.391-1.414,0s-0.391,1.023,0,1.414l6.001,6C28.488,29.902,28.744,30,29,30   s0.512-0.098,0.707-0.293C30.098,29.316,30.098,28.684,29.707,28.293z" />
        </g>
      </svg>
      <input
        ref={inputRef}
        onChange={onChangeInput}
        className={styles.input}
        placeholder="Поиск пиццы..."
        value={value}
      />

      {value && (
        <svg
          onClick={() => onClickClear()}
          className={styles.clear}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
        </svg>
      )}
    </div>
  );
};

export default Search;
