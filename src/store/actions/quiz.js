import axios from '../../axios/axios-config';
import {
  FETCH_QUIZZES_START, FETCH_QUIZZES_SUCCESS, FETCH_QUIZZES_FAIL,
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
