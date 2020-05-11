import React, { Component } from 'react';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';

import classes from './Quiz.module.css';

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    answerState: null, // { [id]: 'success' | 'error'}
    isFinished: false,
    results: {}, //{ [id]: 'success' | 'error'}
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

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results;

    if (question.correctAnswerId === answerId) {

      if (!results[question.id]) {
        results[question.id] = 'success';
      }

      this.setState({
        answerState: { [answerId]: 'success' },
        results,
      });

      setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isFinished: true,
          })
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1,
            answerState: null,
          });
        }
      }, 1000);
    } else {
      results[question.id] = 'error';
      this.setState({
        answerState: { [answerId]: 'error' },
        results,
      });
    }
  }

  componentDidMount() {
    console.log('Quiz id: ', this.props.match.params.id)
  }

  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length
  }

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    })
  }


  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please answer all question</h1>
          {
            this.state.isFinished
              ? <FinishedQuiz
                  results={this.state.results}
                  quiz={this.state.quiz}
                  onRetry={this.retryHandler}
                />
              : <ActiveQuiz
                  answers={this.state.quiz[this.state.activeQuestion].answers}
                  question={this.state.quiz[this.state.activeQuestion].question}
                  onAnswerClick={this.onAnswerClickHandler}
                  quizLength={this.state.quiz.length}
                  answerNumber={this.state.activeQuestion + 1}
                  state={this.state.answerState}
                />
          }
        </div>
      </div>
    );
  }
}

export default Quiz;
