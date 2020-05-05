import React from 'react';

import classes from './ActiveQuiz.module.css';

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p>
        <span>
          <strong>2.</strong>
          How are you ?
        </span>
      </p>

      <ul>
        <li>1</li>
        <li>2</li>
      </ul>
    </div>
  );
}

export default ActiveQuiz;
