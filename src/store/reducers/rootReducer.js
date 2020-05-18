import { combineReducers } from 'redux';
import quizReducer from './quiz';
import newQuizReducer from './newQuiz';


export default combineReducers({
  quiz: quizReducer,
  newQuiz: newQuizReducer,
});
