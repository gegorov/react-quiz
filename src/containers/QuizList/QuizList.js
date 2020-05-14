import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

import Loader from '../../components/UI/Loader/Loader';

import classes from './QuizList.module.css';

class QuizList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quizzes: [],
      loading: true,
    };
  }


  async componentDidMount() {
    try {
      const response = await axios.get('https://quiz-a3324.firebaseio.com/quizzes.json');
      const quizzes = [];
      Object.keys(response.data).forEach((key, index) => {
        quizzes.push({
          id: key,
          quiz: response.data[key],
          name: `Quiz #${index + 1}`,
        });
      });

      this.setState({
        quizzes: [...quizzes],
        loading: false,
      });
    } catch (e) {
      console.log(e);
    }
  }

  renderQuizzes() {
    const { quizzes } = this.state;
    return quizzes.map((quiz) => (
      <li key={quiz.id}>
        <NavLink to={`/quiz/${quiz.id}`}>
          {' '}
          {quiz.name}
        </NavLink>
      </li>
    ));
  }

  render() {
    const { loading } = this.state;
    return (
      <div className={classes.QuizList}>
        <h1>Quiz List</h1>
        {
          loading
            ? <Loader />
            : (
              <ul>
                { this.renderQuizzes() }
              </ul>
            )
        }

      </div>
    );
  }
}

export default QuizList;
