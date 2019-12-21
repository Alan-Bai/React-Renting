import React from "react";
import PropTypes from "prop-types";
import styles from "./index.module.scss";
import { Flex } from "antd-mobile";
import { Link, withRouter } from "react-router-dom";
function SearchHeader({ cityName, history }) {
  return (
    <Flex className={styles.root}>
      {/* 左边 */}
      <Flex className={styles.searchLeft}>
        <div
          className={styles.location}
          onClick={() => history.push("/citylist")}
        >
          <span>{cityName}</span>
          <i className="iconfont icon-arrow" />
        </div>
        <div className={styles.searchForm}>
          <i className="iconfont icon-search" />
          <span>请输入小区或地址</span>
        </div>
      </Flex>
      {/* 右边地图的图标 */}
      <Link to="/map">
        <i className="iconfont icon-map" />
      </Link>
    </Flex>
  );
}

SearchHeader.propTypes = { cityName: PropTypes.string.isRequired };
SearchHeader.defaultProps = { cityName: "" };

export default withRouter(SearchHeader);
