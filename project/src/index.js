import React from 'react'
import ReactDOM from 'react-dom'
import House from './js/container/House'
import HouseDetail from './js/container/HouseDetail'
import UserCenter from './js/container/UserCenter'

import {HashRouter as Router, Route} from 'react-router-dom'
import 'antd/dist/antd.css'
import './css/pc.css'

export default class Root extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path='/' component={House}/>
            <Route path="/usercenter" component={UserCenter}/>
            <Route path="/house-detail/:id" component={HouseDetail}/>
          </div>
        </Router>
      </div>
    );
  };
}

ReactDOM.render(
  <Root />,
  document.getElementById('root')
);
