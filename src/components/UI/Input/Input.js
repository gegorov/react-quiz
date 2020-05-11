import React from 'react';

import classes from './Input.module.css';

function isInvalid(props) {
  const { valid, touched, shouldValidate } = props;
  return !valid && shouldValidate && touched;
}

const Input = props => {
  const inputType = props.type || 'text';
  const cls = [classes.Input];
  const htmlFor = `${inputType}-${Math.random()}`

  if(isInvalid(props)) {
    cls.push(classes.invalid);
  }

  return (
    <div className={cls.join(' ')}>
      <label htmlFor="htmlFor">{props.label}</label>
      <input
        type={inputType}
        id={htmlFor}
        value={props.value}
        onChange={props.onChange}
      />
      {
        isInvalid(props)
          ? <span>{props.errorMessage || 'Please enter correct values'}</span>
          : null
      }
      
    </div>
  );
}

export default Input;
