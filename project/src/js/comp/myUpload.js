import React from 'react'
import { Icon, Upload, Modal, message } from 'antd'
import Constant from '../utils/constant'


export default class MyUpload extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      previewImage: '',
      previewVisible: false,
      fileList: [ ],
    }
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  }

  handleCancel = () => this.setState({previewVisible: false});

  handleChange = ({fileList,file}) => {
    if (file.status === 'done') {
      if (file.response.code === 200) {
        this.props.setUploadImgUrls(file.response.data)
      } else {
        message.error("图片上传失败")
      }
    }
    this.setState({fileList: fileList})
  }

  render () {
    const uploadProps = {
      action: Constant.PIC_UPLOAD_API,
      headers: {
        'Access-Control-Allow-Origin': '*'
      },
      listType: 'picture-card'
    }

    const uploadButton = (
      <div>
        <Icon type='plus'/>
        <div className='ant-upload-text'>上传图片</div>
      </div>
    )

    return (
      <div className='clearfix'>
        <Upload
          {...uploadProps}
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}>
          {this.state.fileList.length >= 6 ? null : uploadButton}
        </Upload>
        <Modal
          visible={this.state.previewVisible}
          footer={null}
          onCancel={this.handleCancel}>
          <img alt='预览' width='100%' src={this.state.previewImage}/>
        </Modal>
      </div>
    )
  }
}

