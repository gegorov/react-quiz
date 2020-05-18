import React from 'react';
import PropTypes from 'prop-types';

import classes from './AnswerItem.module.css';

const propTypes = {
  state: PropTypes.string,
  onAnswerClick: PropTypes.func.isRequired,
  answer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
};

const AnswerItem = (props) => {
  const { answer, state, onAnswerClick } = props;
  const classesList = [classes.AnswerItem];

  if (state) {
    classesList.push(classes[state]);
  }

  return (
    <li
      className={classesList.join(' ')}
      onClick={() => onAnswerClick(answer.id)}
    >
      { answer.text }
    </li>
  );
};

AnswerItem.propTypes = propTypes;
AnswerItem.defaultProps = {
  state: null,
};

export default AnswerItem;
