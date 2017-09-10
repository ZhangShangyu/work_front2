import React from 'react'
import {
  Button, Row, Input, Icon,
  Radio, message
} from 'antd'
import {UserModel, HouseModel} from '../utils/dataModel'
import MyUpload from '../comp/myUpload'
import MyEditor from '../comp/myEditor'

import Constant from '../utils/constant'
const RadioGroup = Radio.Group

export default class HouseEditor extends React.Component {
  initState = () => ({
      uploadImgUrls: [],
      name: '',
      address: '',
      position: '',
      allPos: '',
      price: '',
      area: '',
      des: '',
      type: '',
      comName: '',
      year: '',
    }
  )

  constructor(props) {
    super(props)
    this.state = this.initState()
  }

  setUploadImgUrls = (url) => {
    let imgUrls = this.state.uploadImgUrls
    imgUrls.push(url)
    this.setState({uploadImgUrls: imgUrls})
  }

  submitUploadHouse = () => {
    if (this.checkParam()) {
      let param = this.wrapParam()
      HouseModel.saveHouse(param, (response) => {
        if (response.code === 200) {
          message.success("上传成功")
          this.closeUploadHouse()
        }
      }, (err) => {
        console.log(err)
      })
    }
  }

  checkParam = () => {
    let state = this.state

    if (state.name === '' || isNaN(state.position)
      || isNaN(state.price) || isNaN(state.area)
      || state.des === '' || state.type === ''
      || isNaN(state.allPos)
      || isNaN(state.year)) {
      message.error("请填写完整 或在相应字段输入整数")
      return false
    }
    return true
  }

  wrapParam = () => {
    let state = this.state
    let param = {
      name: state.name,
      address: state.address,
      price: state.price,
      des: state.des,
      agentId: UserModel.getUserInfo().userId,
      imgUrls: state.uploadImgUrls,
      position: state.position,
      allPos: state.allPos,
      room: state.type,
      comName: state.comName,
      year: state.year,
      area: state.area,
    }
    return param
  }

  closeUploadHouse = () => {
    this.setInitState()
    this.props.closeUploadHouse()
  }

  setInitState = () => {
    this.setState(this.initState())
  }

  setHtmlContent = (content) => {
    this.setState({des: content})
  }

  onHouseAddressInput = (e) => {
    this.setState({address: e.target.value})
  }

  onHousePosInput = (e) => {
    this.setState({position: e.target.value})
  }

  onHouseAllPosInput = (e) => {
    this.setState({allPos: e.target.value})
  }

  onPriceInput = (e) => {
    this.setState({price: e.target.value})
  }

  onAreaInput = (e) => {
    this.setState({area: e.target.value})
  }


  onHouseNameInput = (e) => {
    this.setState({name: e.target.value})
  }

  onTypeChecked = (e) => {
    this.setState({type: e.target.value})
  }

  onComNameInput = (e) => {
    this.setState({comName: e.target.value})
  }

  onHouseYearInput = (e) => {
    this.setState({year: e.target.value})
  }

  render() {
    const styles = {
      paddingNum: {
        padding: 20,
      },
      marginNum: {
        marginLeft: '10%'
      }
    }

    const typeOptions = Constant.TYPE_OPTIONS_UPLOAD.slice(1)

    return (
      <div>

        <Row>
          <Icon type="right" style={styles.paddingNum}/>房源标题 &nbsp;&nbsp;
          <Input placeholder="请输入房源标题" onChange={this.onHouseNameInput} style={{width: '50%'}}/>
        </Row>

        <Row>
          <Icon type="right" style={styles.paddingNum}/>房源地址 &nbsp;&nbsp;
          <Input placeholder="请输入房源地址" onChange={this.onHouseAddressInput} style={{width: '50%'}}/>
        </Row>

        <Row>
          <Icon type="right" style={styles.paddingNum}/>建造年代 &nbsp;&nbsp;
          <Input placeholder="请输入建造年代" onChange={this.onHouseYearInput} style={{width: '50%'}}/>
        </Row>

        <Row>
          <Icon type="right" style={styles.paddingNum}/>所在楼层 &nbsp;&nbsp;
          <Input placeholder="请输入所在楼层" onChange={this.onHousePosInput} style={{width: '50%'}}/>
        </Row>
        <Row>
          <Icon type="right" style={styles.paddingNum}/>总楼层 &nbsp;&nbsp;
          <Input placeholder="请输入总楼层" onChange={this.onHouseAllPosInput} style={{width: '50%'}}/>
        </Row>
        <Row>
          <Icon type="right" style={styles.paddingNum}/>公司名称 &nbsp;&nbsp;
          <Input placeholder="请输入公司名称" onChange={this.onComNameInput} style={{width: '50%'}}/>
        </Row>
        <Row>
          <Icon type="right" style={styles.paddingNum}/>价格/万元 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Input placeholder="请输入价格/万元" onChange={this.onPriceInput} style={{width: '20%'}}/>
        </Row>
        <Row>
          <Icon type="right" style={styles.paddingNum}/>面积 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Input placeholder="请输入面积(平方米)" onChange={this.onAreaInput} style={{width: '20%'}}/>
        </Row>
        <Row>
          <Icon type="right" style={styles.paddingNum}/>户型
          <div style={styles.marginNum}>
            <RadioGroup options={typeOptions} onChange={this.onTypeChecked}/>
          </div>
        </Row>
        <Row>
          <Icon type="right" style={styles.paddingNum}/>房源简介 &nbsp;&nbsp;
          <MyEditor setHtmlContent={this.setHtmlContent}/>
        </Row>
        <Row>
          <Icon type="right" style={styles.paddingNum}/>上传展示图片
          <div style={styles.marginNum}>
            <MyUpload setUploadImgUrls={this.setUploadImgUrls}/>
          </div>
        </Row>
        <Row>
          <div style={styles.paddingNum}>
            <Button type="dashed" onClick={this.submitUploadHouse}>提交</Button>&nbsp;&nbsp;&nbsp;
            <Button type="dashed" onClick={this.closeUploadHouse}>取消</Button>
          </div>
        </Row>
      </div>
    )
  }
}
