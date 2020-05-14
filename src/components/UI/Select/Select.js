import React from 'react';
import { v4 as uuid } from 'uuid';

import classes from './Select.module.css';

const Select = (props) => {
  const htmlFor = `$props.label}-${Math.random()}`;
  const {
    label,
    onChange,
    options,
    value,
  } = props;

  return (
    <div className={classes.Select}>
      <label htmlFor={htmlFor}>{ label }</label>
      <select
        id={htmlFor}
        value={value}
        onChange={onChange}
      >
        { options.map((option, index) => (
          <option
            key={index}
            value={option.value}
          >
            { option.text }
          </option>
        )) }
      </select>
    </div>
  );
};

export default Select;
