import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Drawer from '../../components/navigation/Drawer/Drawer';
import MenuToggle from '../../components/navigation/MenuToggle/MenuToggle';

import classes from './Layout.module.css';

const propTypes = {
  children: PropTypes.element.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};
class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

  toggleMenuHandler = () => {
    this.setState((prevState) => ({
      menu: !prevState.menu,
    }));
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  }

  render() {
    const { children, isAuthorized } = this.props;
    const { menu } = this.state;
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={menu}
          onClose={this.menuCloseHandler}
          isAuthorized={isAuthorized}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={menu}
        />
        <main>
          { children }
        </main>
      </div>
    );
  }
}

Layout.propTypes = propTypes;

function mapStateToProps(state) {
  return {
    isAuthorized: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
