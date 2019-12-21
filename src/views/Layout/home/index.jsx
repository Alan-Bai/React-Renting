import React, { Component } from "react";
import { Carousel, Flex, Grid, WingBlank } from "antd-mobile";
// 导入样式
import styles from "./index.module.scss";
// 导入路由
import { Link } from "react-router-dom";
// 导入基本路径
import { BASEURL } from "../../../utils/url";
// 导入本地图片
import image1 from "../../../assets/images/nav-1.png";
import image2 from "../../../assets/images/nav-2.png";
import image3 from "../../../assets/images/nav-3.png";
import image4 from "../../../assets/images/nav-4.png";

import SearchHeader from "../../../components/SearchHeader";
import {getLocationCity} from '../../../utils/getLocationCity';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      swipers: null /**轮播图数据 */,
      imgHeight: 212,
      groups: null, // 租房小组数据
      news: null, // 最新咨询
      cityName:''
    };
  }

  // 导航图
  navs = [
    { icon: image1, text: "整租", path: "/layout/house" },
    { icon: image2, text: "合租", path: "/layout/house" },
    { icon: image3, text: "地图找房", path: "/map" },
    { icon: image4, text: "去出租", path: "/rent/add" }
  ];

  async componentDidMount() {
    const { label } = await getLocationCity()

    this.setState({
      cityName: label
    })
    // 获取轮播图
    this.getSwiperData();
    // 获取租房小组数据
    this.getGroupsData();
    // 获取咨询数据
    this.getNewsData();
  }
  // 获取轮播数据的方法
  getSwiperData = async () => {
    const results = await this.$axios.get("/home/swiper");
    // console.log(results.data.body);
    this.setState({ swipers: results.data.body });
  };
  // 获取租房小组数据的方法
  getGroupsData = async () => {
    const GroupsData = await this.$axios.get("/home/groups");
    this.setState({ groups: GroupsData.data.body });
  };
  // 获取最新资讯方法
  getNewsData = async () => {
    const News = await this.$axios.get("/home/news");
    this.setState({ news: News.data.body });
  };

  // 渲染和导航
  renderNav = () => {
    return (
      <div className={styles.nav}>
        <Flex>
          {this.navs.map(item => {
            return (
              <Flex.Item key={item.text}>
                <Link to={item.path}>
                  <img className={styles.img} src={item.icon} alt="" />
                  <p className={styles.p}>{item.text}</p>
                </Link>
              </Flex.Item>
            );
          })}
        </Flex>
      </div>
    );
  };

  // 渲染轮播图;
  renderSwiper = () => {
    // const {swipers} = this.state
    return (
      <div className={styles.swipers}>
        <Carousel autoplay infinite>
          {this.state.swipers.map(item => (
            <a
              key={item.id}
              href="http://www.alipay.com"
              style={{
                display: "inline-block",
                width: "100%",
                height: this.state.imgHeight
              }}
            >
              <img
                src={`${BASEURL}${item.imgSrc}`}
                alt=""
                style={{ width: "100%", verticalAlign: "top" }}
                onLoad={() => {
                  // fire window resize event to change height
                  window.dispatchEvent(new Event("resize"));
                  this.setState({ imgHeight: "auto" });
                }}
              />
            </a>
          ))}
        </Carousel>
      </div>
    );
  };

  // 渲染租房小组
  renderGroups = () => {
    return (
      <div className={styles.groups}>
        <Flex>
          <Flex.Item className={styles.title}>租房小组</Flex.Item>
          <Flex.Item align="end">更多</Flex.Item>
        </Flex>
        <Grid
          data={this.state.groups}
          columnNum={2}
          square={false}
          renderItem={dataItem => (
            <div key={dataItem.id} className={styles.navItem}>
              <div className={styles.left}>
                <p>{dataItem.title}</p>
                <p>{dataItem.desc}</p>
              </div>
              <div className={styles.right}>
                <img src={`${BASEURL}${dataItem.imgSrc}`} alt="" />
              </div>
            </div>
          )}
        />
      </div>
    );
  };

  // 渲染新闻数据
  renderNews = () => {
    return (
      <div className={styles.news}>
        <h3 className={styles.groupTitle}>最新咨询</h3>
        {this.state.news.map(item => {
          return (
            <WingBlank className={styles.newsItem} key={item.title}>
              <div className={styles.imgWrap}>
                <img src={`${BASEURL}${item.imgSrc}`} alt="" />
              </div>
              <Flex
                className={styles.content}
                direction="column"
                justify="between"
              >
                <h3>{item.title}</h3>
                <Flex className={styles.info} direction="row" justify="between">
                  <span>{item.from}</span>
                  <span>{item.date}</span>
                </Flex>
              </Flex>
            </WingBlank>
          );
        })}
      </div>
    );
  };
  render() {
    const { cityName,swipers, news } = this.state;
    return (
      <div>
        <SearchHeader cityName={cityName} />
        {swipers && this.renderSwiper()}
        {this.renderNav()}
        {this.renderGroups()}
        {news && this.renderNews()}
      </div>
    );
  }
}
