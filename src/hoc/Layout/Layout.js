import React, { Component } from 'react';
import { connect } from 'react-redux';

import Drawer from '../../components/navigation/Drawer/Drawer';
import MenuToggle from '../../components/navigation/MenuToggle/MenuToggle';

import classes from './Layout.module.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: false,
    };
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
  }

  menuCloseHandler = () => {
    this.setState({
      menu: false,
    });
  }

  render() {
    const { children, isAuthorized } = this.props;
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
          isAuthorized={isAuthorized}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>
          { children }
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    isAuthorized: !!state.auth.token,
  };
}

export default connect(mapStateToProps)(Layout);
