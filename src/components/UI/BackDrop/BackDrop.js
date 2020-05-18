import React from 'react';

import classes from './BackDrop.module.css';

const Backdrop = props => {
  return (
    <div className={classes.BackDrop} onClick={props.onClick}></div>
  );
}

export default Backdrop;
