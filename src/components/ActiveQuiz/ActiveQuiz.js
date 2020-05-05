import React from 'react';

import AnswersList from '../AnswersList/AnswersList';
import classes from './ActiveQuiz.module.css';

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>2.{' '}</strong>
          How are you ?
        </span>
        <small>4 0f 10</small>
      </p>

      <AnswersList answers={props.answers} />
    </div>
  );
}

export default ActiveQuiz;
