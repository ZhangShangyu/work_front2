import React from 'react'
import {Table} from 'antd'
import {Link} from 'react-router-dom'
import {HouseModel, UserModel} from '../utils/dataModel'
const {Column} = Table

export default class HouseListByMe extends React.Component {

  constructor(props) {
    super(props)
    this.state = {houses: []}
  }

  componentDidMount() {
    this.getHouseByMe()
  }

  getHouseByMe = () => {
    let param = {
      id: UserModel.getUserInfo().userId
    }
    HouseModel.getHouseByMe(param, (response) => {
      if (response.code === 200) {
        this.setState({houses: response.data})
      }
    }, (err) => {
      console.log(err)
    })
  }

  editHouse(houseId) {

  }

  deleteHouse(houseId) {

  }

  render() {
    return (
      <Table dataSource={this.state.houses}>
        <Column title="房源标题" dataIndex="name" key="name"/>
        <Column title="创建时间" dataIndex="upTime" key="upTime"/>
        <Column title="操作" key="action"
                render={(text, record) => (
                  <span>
                    <Link to={`house-detail/${record.id}`}>查看</Link>
                    <span className="ant-divider"/>
                    <a href="#">编辑</a>
                    <span className="ant-divider"/>
                    <a href="#">删除</a>
                  </span>
                )}/>
      </Table>
    )
  }

}
