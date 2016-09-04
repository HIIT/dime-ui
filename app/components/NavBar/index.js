/**
*
* NavBar
*
*/

import React from 'react';
import { Link } from 'react-router';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import AccountCircle from 'material-ui/svg-icons/action/account-circle';
import IconButton from 'material-ui/IconButton';
import { indigoA700 } from 'material-ui/styles/colors';
import styles from './styles.css';

class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    auth: React.PropTypes.object,
    changeRoute: React.PropTypes.func,
    pathName: React.PropTypes.string,
  };
  handleChange = (event, key, payload) => {
    this.props.changeRoute(payload);
  }
  render() {
    return (
      <div className={styles.navBar}>
        <div className={styles.navBarLeftWrapper}>
          <Link to="/">
            <div className={styles.navBarLogoWrapper}>
              <span
                className={styles.navBarLogo}
              >
                DiMe
              </span>
            </div>
          </Link>
          <div className={styles.navBarMenuWrapper}>
            <DropDownMenu value={this.props.pathName} onChange={this.handleChange}>
              <MenuItem value={'/events'} primaryText="Events" />
              <MenuItem value={'/documents'} primaryText="Documents" />
              <MenuItem value={'/profiles'} primaryText="Profiles" />
              <MenuItem value={'/timeline'} primaryText="Timeline" />
            </DropDownMenu>
          </div>
        </div>
        <div className={styles.navBarRightWrapper}>
          <div className={styles.navBarAccountWrapper}>
            <IconButton
              tooltip="Log Out"
            >
              <AccountCircle
                color={indigoA700}
              />
            </IconButton>
          </div>
        </div>
      </div>
    );
  }
}

export default NavBar;
