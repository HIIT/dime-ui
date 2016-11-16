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
import CloudCircle from 'material-ui/svg-icons/file/cloud-circle';
import IconButton from 'material-ui/IconButton';
import { indigoA700, lightBlue300 } from 'material-ui/styles/colors';
import styles from './styles.css';

class NavBar extends React.Component { // eslint-disable-line react/prefer-stateless-function
  static propTypes = {
    auth: React.PropTypes.object,
    changeRoute: React.PropTypes.func,
    pathName: React.PropTypes.string,
    clickOnAccountIcon: React.PropTypes.func,
    clickOnSendToLeaderboard: React.PropTypes.func,
  };
  handleChange = (event, key, payload) => {
    event.preventDefault();
    this.props.changeRoute(payload);
  }
  render() {
    return (
      <div className={styles.navBar}>
        <div className={styles.navBarLeftWrapper}>
          <div className={styles.navBarSendToLeaderboardWrapper}>
            <IconButton
              tooltip="Send to Leaderboard"
              onClick={this.props.clickOnSendToLeaderboard}
            >
              <CloudCircle
                color={lightBlue300}
              />
            </IconButton>
          </div>
          <Link to="/">
            <div className={styles.navBarLogoWrapper}>
              <span
                className={styles.navBarLogo}
              >
                DiMe
              </span>
            </div>
          </Link>
          { this.props.pathName === '/signin' ? null :
            <div className={styles.navBarMenuWrapper}>
              <DropDownMenu value={this.props.pathName} onChange={this.handleChange}>
                <MenuItem value={'/events'} primaryText="Events" />
                <MenuItem value={'/documents'} primaryText="Documents" />
                <MenuItem value={'/profiles'} primaryText="Profiles" />
                <MenuItem value={'/timeline'} primaryText="Timeline" />
              </DropDownMenu>
            </div>
          }
        </div>
        { this.props.pathName === '/signin' ? null :
          <div className={styles.navBarRightWrapper}>
            <div className={styles.navBarAccountWrapper}>
              <IconButton
                tooltip="Log Out"
                onClick={this.props.clickOnAccountIcon}
              >
                <AccountCircle
                  color={indigoA700}
                />
              </IconButton>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default NavBar;
