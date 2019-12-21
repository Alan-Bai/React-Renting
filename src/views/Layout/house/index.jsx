import React, { Component } from "react";
import { Flex } from "antd-mobile";
import SearchHeader from "../../components/SearchHeader";
import styles from "./index.module.scss";
import { getLocationCity } from "../../utils/city";
export default class House extends Component {
  constructor() {
    super();
    this.state = {
      cityName: ""
    };
  }

  async componentDidMount() {
    const { label } = await getLocationCity();
    this.setState({ cityName: label });
  }

  render() {
    const { cityName } = this.state;
    return (
      <div className={styles.root}>
        <Flex className={styles.listHeader}>
          <i
            onClick={() => this.props.history.goBack()}
            className="iconfont icon-back"
          />
          <SearchHeader cityName={cityName} className={styles.listHeader} />
        </Flex>
      </div>
    );
  }
}
