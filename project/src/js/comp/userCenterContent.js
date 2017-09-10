import React from 'react'
import {
  Row, Col,
  Tabs, Button
} from 'antd'
import HouseEditor from './houseEditor'
import HouseListByMe from './houseListByMe'


const TabPane = Tabs.TabPane;

export default class UserCenterContent extends React.Component {

  initState = () => ({
      showUploadHouse: false,
    }
  )

  constructor() {
    super()
    this.state = this.initState()
  }

  componentDidMount() {

  }

  closeUploadHouse = () => {
    this.setState({showUploadHouse: false})
  }

  showUploadHouse = () => {
    this.setState({showUploadHouse: true})
  }

  setHtmlContent = (content) => {
    this.setState({content})
  }

  render() {

    const listRow = (
      <Row>
        <Col span={2}></Col>
        <Col span={20}>
          <Tabs style={{padding: 40}}>
            <TabPane tab='我发布的房源' key='1'>
              <HouseListByMe/>
            </TabPane>
          </Tabs>
        </Col>
        <Col span={2}></Col>
      </Row>
    )

    const houseEditorRow = (
      <Row>
        <Col span={6}></Col>
        <Col span={12}>
          <HouseEditor closeUploadHouse={this.closeUploadHouse}/>
        </Col>
        <Col span={6}></Col>
      </Row>
    )

    let contentRow = this.state.showUploadHouse ? houseEditorRow : listRow

    return (
      <div>
        <Row>
          <Col span={4}></Col>
          <Col span={20} style={{marginTop: '1%'}}>
            { !this.state.showUploadHouse &&
            <Button type="dashed" style={{fontWeight: 'bold', color: 'blue'}}
                    onClick={this.showUploadHouse}>上传房源</Button>
            }
          </Col>
        </Row>
        {contentRow}
      </div>
    )
  }
}
