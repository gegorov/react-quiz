import React from 'react';
import PropTypes from 'prop-types';

import AnswersList from '../AnswersList/AnswersList';
import classes from './ActiveQuiz.module.css';

const propTypes = {
  answerNumber: PropTypes.number.isRequired,
  answers: PropTypes.any.isRequired,
  question: PropTypes.any.isRequired,
  quizLength: PropTypes.number.isRequired,
  onAnswerClick: PropTypes.func.isRequired,
  state: PropTypes.object,
};

const ActiveQuiz = (props) => {
  const {
    answerNumber, answers, question, quizLength, onAnswerClick, state,
  } = props;
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question}>
        <span>
          <strong>
            {answerNumber}
            .
            {' '}
          </strong>
          {question}
        </span>
        <small>
          {answerNumber}
          {' '}
          of
          {' '}
          {quizLength}
        </small>
      </p>

      <AnswersList
        answers={answers}
        onAnswerClick={onAnswerClick}
        state={state}
      />
    </div>
  );
};

ActiveQuiz.propTypes = propTypes;
ActiveQuiz.defaultProps = {
  state: null,
};
export default ActiveQuiz;
