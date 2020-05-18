import React, { Component } from 'react';
import {
  Redirect, Route, Switch, withRouter,
} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from './store/actions/auth';

import Layout from './hoc/Layout/Layout';
import Auth from './containers/Auth/Auth';
import Quiz from './containers/Quiz/Quiz';
import QuizCreator from './containers/QuizCreator/QuizCreator';
import QuizList from './containers/QuizList/QuizList';
import Logout from './components/Logout/Logout';

const propTypes = {
  authLogin: PropTypes.func.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};

class App extends Component {
  componentDidMount() {
    const { authLogin } = this.props;

    authLogin();
  }

  render() {
    const { isAuthorized } = this.props;

    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" exact component={QuizList} />
        <Redirect to="/" />
      </Switch>
    );

    if (isAuthorized) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={QuizList} />
          <Redirect to="/" />
        </Switch>
      );
    }

    return (
      <Layout>
        { routes }
      </Layout>
    );
  }
}

App.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthorized: !!state.auth.token,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authLogin: () => dispatch(actions.autoLogin()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
