import React, { Component } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";
import { TabBar } from "antd-mobile";

import Home from "./home";
import Info from "./info";
import House from "./house";
import My from "./my";
import NotFound from "../NotFound";

import styles from "./index.module.scss";


export default class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: props.location.pathname
    };
  }
  // tabs数组
  TABS = [
    {
      title: "首页",
      icon: "icon-index",
      path: "/layout/home"
    },
    {
      title: "找房",
      icon: "icon-findHouse",
      path: "/layout/house"
    },
    {
      title: "资讯",
      icon: "icon-info",
      path: "/layout/info"
    },
    {
      title: "我的",
      icon: "icon-my",
      path: "/layout/my"
    }
  ];

  render() {
    return (
      <Router>
        <div className={styles.layout}>
          <Switch>
            <Route path="/layout/home" component={Home} />
            <Route path="/layout/house" component={House} />
            <Route path="/layout/info" component={Info} />
            <Route path="/layout/my" component={My} />
            <Redirect exact from="/layout" to="/layout/home" />
            <Route component={NotFound} />
          </Switch>
          {/* <div>
            <Link to="/layout/home">首页</Link>&nbsp;
            <Link to="/layout/house">房源</Link>&nbsp;
            <Link to="/layout/info">咨询</Link>&nbsp;
            <Link to="/layout/my">我的</Link>
          </div> */}
          <div className={styles.tabbar}>
            <TabBar tintColor="#21B97A" noRenderContent>
              {this.TABS.map(item => {
                return (
                  <TabBar.Item
                    title={item.title}
                    key={item.title}
                    icon={<i className={`iconfont ${item.icon}`}></i>}
                    selectedIcon={<i className={`iconfont ${item.icon}`}></i>}
                    selected={this.state.selectedTab === item.path}
                    onPress={() => {
                      // 切换选中的高亮状态
                      this.setState({
                        selectedTab: item.path
                      });
                      // 切换路由
                      if (this.state.selectedTab !== item.path) {
                        this.props.history.push(item.path);
                      }
                    }}
                  ></TabBar.Item>
                );
              })}
            </TabBar>
          </div>
        </div>
      </Router>
    );
  }
}
