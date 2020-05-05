import React, { Component } from 'react';

import classes from './Drawer.module.css';

const links = [
  1, 2, 3,
];

class Drawer extends Component {
  
  renderLinks() {
    return links.map((link, index) => {
      return (
        <li key={index}>
          Link {link}
        </li>
      )
    })
  }

  render() { 
    const cls = [classes.Drawer];

    if (!this.props.isOpen) {
      cls.push(classes.close);
    }

    return (
      <nav className={cls.join(' ')}>
        <ul>
          <a>
            {this.renderLinks()}
          </a>
        </ul>
      </nav>
    );
  }
}

export default Drawer;
