import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../store/actions/quiz';

import Loader from '../../components/UI/Loader/Loader';

import classes from './QuizList.module.css';

class QuizList extends Component {
  componentDidMount() {
    const { fetchQuizzes } = this.props;
    fetchQuizzes();
  }

  renderQuizzes() {
    const { quizzes } = this.props;
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
    const { loading, quizzes } = this.props;
    return (
      <div className={classes.QuizList}>
        <h1>Quiz List</h1>
        {
          loading && quizzes.length !== 0
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

function mapStateToProps(state) {
  return {
    quizzes: state.quiz.quizzes,
    loading: state.quiz.loading,
  };
}

function mapDispatchTpProps(dispatch) {
  return {
    fetchQuizzes: () => dispatch(actions.fetchQuizzes()),
  };
}

export default connect(mapStateToProps, mapDispatchTpProps)(QuizList);
