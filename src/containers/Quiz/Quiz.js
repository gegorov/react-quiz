import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/quiz';

import ActiveQuiz from '../../components/ActiveQuiz/ActiveQuiz';
import FinishedQuiz from '../../components/FinishedQuiz/FinishedQuiz';
import Loader from '../../components/UI/Loader/Loader';

import classes from './Quiz.module.css';

class Quiz extends Component {
  componentDidMount() {
    const { fetchQuizById, match: { params: { id } } } = this.props;
    fetchQuizById(id);
  }

  componentWillUnmount() {
    const { retryQuiz } = this.props;
    retryQuiz();
  }


  isQuizFinished() {
    const { activeQuestion, quiz } = this.state;
    return activeQuestion + 1 === quiz.length;
  }


  render() {
    const {
      answerState,
      loading,
      isFinished,
      results,
      quiz,
      activeQuestion,
      quizAnswerClick,
      retryQuiz,
    } = this.props;

    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Please answer all questions</h1>

          {
            loading || !quiz
              ? <Loader />
              : (
                isFinished
                  ? (
                    <FinishedQuiz
                      results={results}
                      quiz={quiz}
                      onRetry={retryQuiz}
                    />
                  )
                  : (
                    <ActiveQuiz
                      answers={quiz[activeQuestion].answers}
                      question={quiz[activeQuestion].question}
                      onAnswerClick={quizAnswerClick}
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

function mapStateToProps(state) {
  return {
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    isFinished: state.quiz.isFinished,
    results: state.quiz.results,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading,
  };
}

function mapDispatchTpProps(dispatch) {
  return {
    fetchQuizById: (id) => dispatch(actions.fetchQuizById(id)),
    quizAnswerClick: (answerId) => dispatch(actions.quizAnswerClick(answerId)),
    retryQuiz: () => dispatch(actions.retryQuiz()),
  };
}

export default connect(mapStateToProps, mapDispatchTpProps)(Quiz);
