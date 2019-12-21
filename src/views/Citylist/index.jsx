import React, { Component } from "react";
import styles from "./index.module.scss";
import NavHeader from "../../components/NavHeader";
// 导入获取定位的城市
import { getLocationCity } from "../../utils/getLocationCity";
import { AutoSizer, List } from "react-virtualized";
// 每一行标题的高度
const TITLE_HEIGHT = 36;
// 每一行中，它下面的每一个城市的高度
const ROW_HEIGHT = 50;
export default class CityList extends Component {
  listRef = React.createRef();
  constructor() {
    super();
    this.state = {
      Citygroup: [] //城市数据
    };
  }

  componentDidMount() {
    this.getCitys();
    this.dealCityData(this.state.Citygroup);
  }

  // 获取城市数据方法
  getCitys = async () => {
    const citys = await this.$axios.get("/area/city?level=1");
    this.setState({ Citygroup: citys.data.body });
    // console.log(this.state.Citygroup);
  };

  // 处理城市列表数据的方法
  dealCityData = async list => {
    const tempObj = {};
    list.forEach(item => {
      const firstLetter = item.short.substr(0, 1); //城市首字母数组
      // console.log(firstLetter);
      if (tempObj[firstLetter]) {
        //对象中首字母是X的数组
        tempObj[firstLetter].push(item);
      } else {
        tempObj[firstLetter] = [item];
      }
    });

    // 处理右边索引渲染所需要的数据
    const tempIndex = Object.keys(tempObj).sort();

    // 2、处理服务器返回的热门城市列表数据
    const result = await this.$axios.get("/area/hot");
    tempIndex.unshift("hot");
    tempObj["hot"] = result.data.body;
    // 获取定位城市
    const locationCity = await getLocationCity();
    console.log(locationCity);
  };

  // 格式化我们的字母
  formatLetter = letter => {
    switch (letter) {
      case "#":
        return "定位城市";
      case "hot":
        return "热门城市";
      default:
        return letter.toUpperCase();
    }
  };

  // 渲染左边列表的每一行
  rowRender = ({ key, index, style }) => {
    // 取出右边索引的每一个字母
    const letter = this.state.cityIndexList[index];
    // 取出每个字母下面包含的城市列表数据
    const list = this.state.cityListObj[letter];
    return (
      <div className={styles.city} key={key} style={style}>
        <div className={styles.title}>{this.formatLetter(letter)}></div>
        {list.map(item => {
          return (
            <div key={item.value} className={styles.name}>
              {item.label}
            </div>
          );
        })}
      </div>
    );
  };

  // 计算每一行的高度
  calcRowHeight = ({ index }) => {
    const cityIndex = this.state.cityIndexList[index];
    const list = this.state.cityListObj[cityIndex];
    return TITLE_HEIGHT + list.length * ROW_HEIGHT;
  };

  // 渲染右边的索引列表
  renderCityIndexList = () => {
    const { cityIndexList, activeIndex } = this.state;
    return (
      <div className={styles.cityIndex}>
        {cityIndexList.map((item, index) => {
          return (
            <div
              key={item}
              className={styles.cityIndexList}
              onClick={() => {
                this.clickIndex(index);
              }}
            >
              <span className={index === activeIndex ? styles.indexActive : ""}>
                {item === "hot" ? "热" : item.toUpperCase()}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  // 触动左边的长列表出发的方法
  onRowsRender = ({ startIndex }) => {
    if (this.state.activeIndex !== startIndex) {
      this.setState({
        indexActive: startIndex
      });
    }
  };

  // 点击右边的的索引
  onClick = index => {
    this.listRef.current.scrollToRow(index);
  };
  render() {
    const { cityListObj, cityIndexList } = this.state;
    return (
      <div className={styles.citylist}>
        {/* 渲染NavHeader子组件 */}
        <NavHeader>城市选择</NavHeader>
        {/* 渲染右边长列表
        {cityListObj && (
          <AutoSizer>
            {({ height, width }) => {
              <List
                ref={this.listRef}
                height={height}
                width={width}
                rowCount={cityIndexList.length}
                rowHeight={this.calcRowHeight}
                rowRenderer={this.rowRender}
                onRowsRendered={this.onRowsRender}
                scrollToAlignment="start"
              ></List>;
            }}
          </AutoSizer>
        )} */}
        {/* 渲染右边的索引列表 */}
        {cityIndexList && this.renderCityIndexList()}
      </div>
    );
  }
}
