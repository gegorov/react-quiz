import axios from '../../axios/axios-config';
import { quizIsFinished } from '../../helpers/helpers';

import {
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZZES_FAIL,
  FETCH_QUIZZES_BY_ID_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_FINISHED,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from './actionTypes';


export function fetchQuizzesStart() {
  return {
    type: FETCH_QUIZZES_START,
  };
}

export function fetchQuizzesSuccess(quizzes) {
  return {
    type: FETCH_QUIZZES_SUCCESS,
    quizzes: [...quizzes],
  };
}

export function fetchQuizzesByIdSuccess(quiz) {
  return {
    type: FETCH_QUIZZES_BY_ID_SUCCESS,
    quiz,
  };
}

export function fetchQuizzesFail(error) {
  return {
    type: FETCH_QUIZZES_FAIL,
    error,
  };
}

export function fetchQuizzes() {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await axios.get('/quizzes.json');
      const quizzes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          quiz: response.data[key],
          name: `Quiz #${index + 1}`,
        });
      });
      return dispatch(fetchQuizzesSuccess(quizzes));
    } catch (e) {
      return dispatch(fetchQuizzesFail(e));
    }
  };
}

export function fetchQuizById(id) {
  return async (dispatch) => {
    dispatch(fetchQuizzesStart());
    try {
      const response = await axios.get(`/quizzes/${id}.json`);
      return dispatch(fetchQuizzesByIdSuccess(response.data));
    } catch (e) {
      return dispatch(fetchQuizzesFail(e));
    }
  };
}

export function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results,
  };
}

export function quizFinished() {
  return {
    type: QUIZ_FINISHED,
  };
}

export function quizNextQuestion() {
  return {
    type: QUIZ_NEXT_QUESTION,
  };
}

export function quizAnswerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState();

    const {
      answerState, activeQuestion, quiz, results,
    } = state.quiz;
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
      dispatch(quizSetState({ [answerId]: 'success' }, results));
      console.log('before tada');
      setTimeout(() => {
        if (quizIsFinished(state.quiz)) {
          console.log('tada');
          dispatch(quizFinished());
        } else {
          dispatch(quizNextQuestion());
        }
      }, 1000);
    } else {
      results[question.id] = 'error';
      dispatch(quizSetState({ [answerId]: 'error' }, results));
    }
  };
}

export function retryQuiz() {
  return {
    type: QUIZ_RETRY,
  };
}
