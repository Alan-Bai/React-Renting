import React from "react";
import styles from "./index.module.scss";
import { NavBar } from "antd-mobile";
import { withRouter } from "react-router-dom";

import PropTypes from "prop-types";

function NavHeader({ children, history }) {
  return (
    <NavBar
      className={styles.navBar}
      mode="light"
      icon={<i className="iconfont icon-back" />}
      onLeftClick={() => history.goBack()}
    >
      {children}
    </NavBar>
  );
}

NavHeader.propTypes = { children: PropTypes.string.isRequired };
NavHeader.defaultProps = { children: "" };

export default withRouter(NavHeader);
