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
    console.log('params: ', this.props.match.params);

    const { match: { params: { id } } } = this.props;
    console.log('id: ', id);

    try {
      const response = await axios.get(`/quizzes/${id}.json`);

      console.log(response);
      this.setState({
        quiz: response.data,
        loading: false,
      });
    } catch (error) {
      console.log(error);
    }
  }

  onAnswerClickHandler = (answerId) => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === 'success') {
        return;
      }
    }

    const question = this.state.quiz[this.state.activeQuestion];
    const { results } = this.state;

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

  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {},
    });
  }


  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }


  render() {
    const { loading } = this.state;
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please answer all question</h1>

          {
            loading
              ? <Loader />
              : (
                this.state.isFinished
                  ? (
                    <FinishedQuiz
                      results={this.state.results}
                      quiz={this.state.quiz}
                      onRetry={this.retryHandler}
                    />
                  )
                  : (
                    <ActiveQuiz
                      answers={this.state.quiz[this.state.activeQuestion].answers}
                      question={this.state.quiz[this.state.activeQuestion].question}
                      onAnswerClick={this.onAnswerClickHandler}
                      quizLength={this.state.quiz.length}
                      answerNumber={this.state.activeQuestion + 1}
                      state={this.state.answerState}
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
