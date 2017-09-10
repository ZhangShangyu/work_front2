import React, {Component} from 'react';
import Header from '../comp/header';
import UserCenterContent from '../comp/userCenterContent'
import Footer from '../comp/footer'

export default class UserCenter extends Component {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {

  }

  render() {

    return (
      <div>
        <Header/>
        <UserCenterContent/>
        <Footer/>
      </div>
    );
  }
}

