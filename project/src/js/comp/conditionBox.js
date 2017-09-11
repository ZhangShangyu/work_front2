import React from 'react'
import {Card} from 'antd'
import Constant from '../utils/constant'

export default class ConditionBox extends React.Component {

  initState = () => ({
      priceClickedIndex: 0,
      areaClickedIndex: 0,
      typeClickedIndex: 0,
      sortClickedIndex: 0,
      priceValue: 0,
      areaValue: 0,
      typeValue: 0,
      sortValue: 0,
    }
  )

  constructor(props) {
    super(props)
    this.state = this.initState()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.needReset) {
      this.setInitState()
    }
  }

  setInitState = () => {
    this.setState(this.initState())
  }

  onConditionClick(value, index, type) {
    switch (type) {
      case 'price':
        this.setState({
          priceClickedIndex: index, priceValue: value,
        }, () => this.setSearchCondition())
        break
      case 'area':
        this.setState({
          areaClickedIndex: index, areaValue: value,
        }, () => this.setSearchCondition())
        break;
      case 'type':
        this.setState({
          typeClickedIndex: index, typeValue: value,
        }, () => this.setSearchCondition())
        break
      case 'sort':
        this.setState({
          sortClickedIndex: index, sortValue: value,
        }, () => this.setSearchCondition())
        break
      default:
        break
    }
  }


  setSearchCondition = () => {
    let condition = {}
    let {priceValue, areaValue, typeValue, sortValue} = this.state

    areaValue !== 0 ? condition.areaType = areaValue : ''
    priceValue !== 0 ? condition.priceType = priceValue : ''
    typeValue !== 0 ? condition.roomType = typeValue : ''
    sortValue !== 0 ? condition.sortType = sortValue : ''

    this.props.setSearchCondition(condition)
  }

  getClickStyle = (index, type) => {
    let colorStyle = {color: 'grey'}
    let state = this.state
    let dict = {
      price: state.priceClickedIndex,
      area: state.areaClickedIndex,
      type: state.typeClickedIndex,
      sort: state.sortClickedIndex,
    }
    if (index === dict[type]) {
      colorStyle.color = 'blue'
    }
    return colorStyle
  }

  render() {
    const styles = {
      span: {
        marginRight: 15,
        color: '#999',
        verticalAlign: 'top'
      },
      div: {
        borderBottom: '1px dashed #d8d8d8',
        padding: 10,
      },
      span2: {
        marginRight: 15,
        color: '#999',
      },
    }
    const priceOptions = this.props.searchType === '1'
      ? Constant.SALE_PRICE_OPTIONS : Constant.RENT_PRICE_OPTIONS

    const areaOptions = Constant.AREA_OPTIONS

    const typeOptions = Constant.TYPE_OPTIONS

    const sortOptions = Constant.SORT_OPTIONS


    const priceList = priceOptions.map((item, index) => (
        <span key={index}
              onClick={this.onConditionClick.bind(this, item.value, index, 'price')}>
          <a style={this.getClickStyle(index, 'price')}>{item.label}</a> &nbsp;&nbsp;
        </span>
      )
    )

    const areaList = areaOptions.map((item, index) => (
        <span key={index}
              onClick={this.onConditionClick.bind(this, item.value, index, 'area')}>
          <a style={this.getClickStyle(index, 'area')}>{item.label}</a> &nbsp;&nbsp;
        </span>
      )
    )

    const typeList = typeOptions.map((item, index) => (
        <span key={index}
              onClick={this.onConditionClick.bind(this, item.value, index, 'type')}>
          <a style={this.getClickStyle(index, 'type')}>{item.label}</a> &nbsp;&nbsp;
        </span>
      )
    )

    const sortList = sortOptions.map((item, index) => (
        <span key={index}
              onClick={this.onConditionClick.bind(this, item.value, index, 'sort')}>
          <a style={this.getClickStyle(index, 'sort')}>{item.label}</a> &nbsp;&nbsp;
        </span>
      )
    )

    return (
      <Card title="筛选条件">
        <div>
          <div style={styles.div}>
            <span style={styles.span}>售价：</span>
            {priceList}
          </div>
          <div style={styles.div}>
            <span style={styles.span}>面积：</span>
            {areaList}
          </div>
          <div style={styles.div}>
            <span style={styles.span}>户型：</span>
            {typeList}
          </div>
          <div style={styles.div}>
            <span style={styles.span}>排序：</span>
            {sortList}
          </div>
        </div>
      </Card>
    )
  }
}