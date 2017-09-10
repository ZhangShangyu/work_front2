import React from 'react';
import { Link } from 'react-router-dom';
import Login from './login';
import { Row, Col, Menu, Icon, Tabs, Button, Modal} from 'antd';
import logo from '../../img/logo.svg';
import { UserModel } from '../utils/dataModel'

const TabPane = Tabs.TabPane;

export default class Header extends React.Component {

  constructor() {
    super();
    this.state = {
      current: 'home',
      modalVisible: false,
      action: 'login',
      hasLogined: false,
      userNickName: '',
      userId: 0
    };
  }
  componentWillMount() {
    this.setState({current:this.props.selected});
    const userInfo = UserModel.getUserInfo();
    // if (userInfo !== '') {
    //   this.setState({
    //     hasLogined: true,
    //     userNickName: userInfo.username,
    //     userId: userInfo.userId,
    //   });
    // }
  }

  setModalVisible(value) {
    this.setState({modalVisible: value});
  }

  handleClick(e) {
    if (e.key == 'register') {
      this.setState({current: 'register'});
      this.setModalVisible(true);
    } else {
      this.setState({current: e.key});
    }
  }

  callback(key) {
    if (key == 1) {
      this.setState({action: 'login'});
    } else if (key == 2) {
      this.setState({action: 'register'});
    }
  }

  setHeaderState(obj) {
    this.setState(obj);
  }

  logout() {
    localStorage.userInfo = '';
    this.setState({hasLogined: false});
  }

  render() {
    const userShow = this.state.hasLogined
      ? <Menu.Item key='logout' className='register'>
          <Button type='primary' htmlType='button'>{this.state.userNickName}</Button>
          &nbsp;&nbsp;
          <Link to={`/usercenter`} target='_blank'>
            <Button type="dashed" htmlType="button">经纪人中心</Button>
          </Link>
          &nbsp;&nbsp;
          <Button
            type='ghost'
            htmlType='button'
            onClick={this.logout.bind(this)}>退出</Button>
        </Menu.Item>
      : <Menu.Item key='register' className='register'>
        <Icon type='appstore'/>经纪人登录
      </Menu.Item>;

    const formItemLayout = {
      labelCol: { xs: {span: 24}, sm: {span: 6} },
      wrapperCol: { xs: {span: 24}, sm: {span: 14} }
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {span: 24, offset: 0},
        sm: {span: 14, offset: 6}
      }
    };

    return (
      <header>
        <Row>
          <Col span={2}/>
          <Col span={4}>
            <a href='/' className='logo'>
              <img src={logo} alt='logo'/>
              <span>房源信息</span>
            </a>
          </Col>
          <Col span={16}>
            <Menu
              mode="horizontal" selectedKeys={[this.state.current]}
              onClick={this.handleClick.bind(this)}>
              <Menu.Item key='home'>
                <Link to={`/`} target='_blank'>
                  <Icon type='appstore'/>列表页
                </Link>
              </Menu.Item>
              {userShow}
            </Menu>

            <Modal
              wrapClassName='vertical-center-modal'
              title='经纪人中心'
              visible={this.state.modalVisible}
              onCancel={() => this.setModalVisible(false)}
              onOk={() => this.setModalVisible(false)}
              okText='关闭'>
              <Tabs type='card' onChange={this.callback.bind(this)}>
                <TabPane tab='登录' key='1'>
                  <Login
                    formItemLayout={formItemLayout}
                    tailFormItemLayout={tailFormItemLayout}
                    setModalVisible={this.setModalVisible.bind(this)}
                    action={this.state.action}
                    setHeaderState={this.setHeaderState.bind(this)}>
                  </Login>
                </TabPane>
              </Tabs>
            </Modal>
          </Col>
          <Col span={2}></Col>
        </Row>
      </header>
    );
  };
}
