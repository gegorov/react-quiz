import React, { Component } from 'react';

import Drawer from '../../components/navigation/Drawer/Drawer';
import MenuToggle from '../../components/navigation/MenuToggle/MenuToggle';

import classes from './Layout.module.css';

class Layout extends Component {
  state = {
    menu: false,
  }

  toggleMenuHandler = () => {
    this.setState({
      menu: !this.state.menu,
    });
    console.log('Toggled!')
  }

  render() {
    return (
      <div className={classes.Layout}>
        <Drawer
          isOpen={this.state.menu}
        />
        <MenuToggle
          onToggle={this.toggleMenuHandler}
          isOpen={this.state.menu}
        />
        <main>
          { this.props.children }
        </main>
      </div>
    )
  }
}

export default Layout;
