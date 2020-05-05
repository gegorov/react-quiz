import React, { Component } from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import classes from './Quiz.module.css';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' | 'error'}
    quiz: [
      {
        id: 1,
        question: 'What is the color of the sky?',
        correctAnswerId: 2,
        answers: [
          {
            id: 1,
            text: 'Black',
          },
          {
            id: 2,
            text: 'Blue',
          },
          {
            id: 3,
            text: 'Red',
          },
          {
            id: 4,
            text: 'Green',
          },
        ],
      },
      {
        id: 2,
        question: 'When was Philadelphia founded?',
        correctAnswerId: 3,
        answers: [
          {
            id: 1,
            text: '1704',
          },
          {
            id: 2,
            text: '1650',
          },
          {
            id: 3,
            text: '1682',
          },
          {
            id: 4,
            text: '1830',
          },
        ],
      },

    ],
  };

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Quiz</h1>
          <ActiveQuiz />
        </div>
      </div>
    );
  }
}

export default Quiz;
