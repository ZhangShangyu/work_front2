import React from 'react'
import '../../css/quill.snow.css'
import ReactQuill from 'react-quill'

export default class MyEditor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {editorHtml: ''}
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(html) {
    this.setState({editorHtml: html})
    this.props.setHtmlContent(html)
  }

  render() {
    return (
      <ReactQuill
        theme={'snow'}
        onChange={this.handleChange}
        value={this.state.editorHtml}
        modules={MyEditor.modules}
        formats={MyEditor.formats}
        placeholder={"编辑房源描述"}
      />
    )
  }
}

/*
 * Quill modules to attach to editor
 * See http://quilljs.com/docs/modules/ for complete options
 */
MyEditor.modules = {
  toolbar: [
    [{'header': [1, 2, false]}, {'font': []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
      {'indent': '-1'}, {'indent': '+1'}],
    ['link'], ['clean']
  ]
}
/*
 * Quill editor formats
 * See http://quilljs.com/docs/formats/
 */
MyEditor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]