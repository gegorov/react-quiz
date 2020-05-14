import React, { Component } from 'react';
import axios from '../../axios/axios-config';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import classes from './Quiz.module.css';

class Quiz extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeQuestion: 0,
      answerState: null, // { [id]: 'success' | 'error'}
      isFinished: false,
      results: {}, // { [id]: 'success' | 'error'}
      quiz: [],
      loading: true,
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;

    try {
      const response = await axios.get(`/quizzes/${id}.json`);

      this.setState({
        quiz: response.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onAnswerClickHandler = (answerId) => {
    const {
      answerState, activeQuestion, quiz, results,
    } = this.state;
    if (answerState) {
      const key = Object.keys(answerState)[0];
      if (answerState[key] === 'success') {
        return;
      }
    }

    const question = quiz[activeQuestion];

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
          });
        } else {
          this.setState({
            activeQuestion: activeQuestion + 1,
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

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  }


  isQuizFinished() {
    const { activeQuestion, quiz } = this.state;
    return activeQuestion + 1 === quiz.length;
  }


  render() {
    const {
      answerState, loading, isFinished, results, quiz, activeQuestion,
    } = this.state;
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please answer all question</h1>

          {
            loading
              ? <Loader />
              : (
                isFinished
                  ? (
                    <FinishedQuiz
                      results={results}
                      quiz={quiz}
                      onRetry={this.retryHandler}
                    />
                  )
                  : (
                    <ActiveQuiz
                      answers={quiz[activeQuestion].answers}
                      question={quiz[activeQuestion].question}
                      onAnswerClick={this.onAnswerClickHandler}
                      quizLength={quiz.length}
                      answerNumber={activeQuestion + 1}
                      state={answerState}
                    />
                  )
              )
          }

        </div>
      </div>
    );
  }
}

export default Quiz;
