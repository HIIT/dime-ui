/**
*
* NavLink
*
*/

import React from 'react';
import { Link } from 'react-router';

import styles from './styles.css';

function NavLink() {
  return (
    <Link {...this.props} className={styles.navLink} activeClassName="active" />
  );
}

export default NavLink;
