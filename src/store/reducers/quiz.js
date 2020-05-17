import {
  FETCH_QUIZZES_START,
  FETCH_QUIZZES_SUCCESS,
  FETCH_QUIZZES_FAIL,
  FETCH_QUIZZES_BY_ID_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_FINISHED,
  QUIZ_NEXT_QUESTION,
  QUIZ_RETRY,
} from '../actions/actionTypes';

const initialState = {
  quizzes: [],
  loading: false,
  error: null,
  activeQuestion: 0,
  answerState: null, // { [id]: 'success' | 'error'}
  isFinished: false,
  results: {}, // { [id]: 'success' | 'error'}
  quiz: null,
};

export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZZES_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        quizzes: action.quizzes,
        loading: false,
      };
    case FETCH_QUIZZES_BY_ID_SUCCESS:
      return {
        ...state,
        quiz: action.quiz,
        loading: false,
      };
    case FETCH_QUIZZES_FAIL:
      return {
        ...state,
        error: action.error,
        loading: false,
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results,
      };
    case QUIZ_FINISHED:
      return {
        ...state,
        isFinished: true,
      };
    case QUIZ_NEXT_QUESTION:
      return {
        ...state,
        activeQuestion: state.activeQuestion + 1,
        answerState: null,
      };
    case QUIZ_RETRY:
      return {
        ...state,
        activeQuestion: 0,
        answerState: null,
        isFinished: false,
        results: {},
      };
    default:
      return state;
  }
}
