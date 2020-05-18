import { combineReducers } from 'redux';
import authReducer from './auth';
import newQuizReducer from './newQuiz';
import quizReducer from './quiz';


export default combineReducers({
  auth: authReducer,
  newQuiz: newQuizReducer,
  quiz: quizReducer,
});
