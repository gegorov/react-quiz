import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';


import BackDrop from '../../UI/BackDrop/BackDrop';

import classes from './Drawer.module.css';

class Drawer extends Component {
  renderLinks(links) {
    const { onClose } = this.props;

    return links.map((link, index) => (
      <li key={index}>
        <NavLink
          to={link.to}
          exact={link.exact}
          activeClassName={classes.active}
          onClick={onClose}
        >
          {link.label}
        </NavLink>
      </li>
    ));
  }

  render() {
    const { isAuthorized, isOpen, onClose } = this.props;
    console.log('drawer', isAuthorized);
    const cls = [classes.Drawer];

    if (!isOpen) {
      cls.push(classes.close);
    }

    const links = [
      {
        to: '/',
        label: 'List of Quizzes',
        exact: true,
      },
    ];

    if (isAuthorized) {
      links.push({
        to: '/quiz-creator',
        label: 'Create Quiz',
        exact: true,
      });
      links.push({
        to: '/logout',
        label: 'Logout',
        exact: true,
      });
    } else {
      links.push({
        to: '/auth',
        label: 'Authorization',
        exact: false,
      });
    }


    return (
      <>
        <nav className={cls.join(' ')}>
          <ul>
            {this.renderLinks(links)}
          </ul>
        </nav>
        {isOpen ? <BackDrop onClick={onClose} /> : null }
      </>
    );
  }
}

export default Drawer;
