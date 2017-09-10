import React from 'react';
import {Row, Col} from 'antd';
import ConditionBox from  './conditionBox'
import HouseImgBlock from './houseImgBlock'

export default class HouseContent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      searchCondition: {},
      searchKey: "",
      needResetCondition: false,
      searchType: this.props.searchType,
    }
  }

  setSearchCondition = (condition) => {
    this.setState({searchCondition: condition, needResetCondition: false})
  }

  render() {
    return (
      <div>
        <Row>
          <Col span={5}></Col>
          <Col span={14} style={{marginTop: 25}}>
            <ConditionBox setSearchCondition={this.setSearchCondition}
                          needReset={this.state.needResetCondition}
                          searchType={this.state.searchType}/>
          </Col>
          <Col span={5}></Col>
        </Row>
        <Row>
          <Col span={5}></Col>
          <Col span={14} style={{marginTop: 25}}>
            <HouseImgBlock searchCondition={this.state.searchCondition}
                           searchKey={this.state.searchKey}
                           searchType={this.state.searchType}/>
          </Col>
          <Col span={5}></Col>
        </Row>
      </div>
    )
  }
}
