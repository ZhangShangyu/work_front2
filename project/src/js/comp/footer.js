import React from 'react';
import {Row, Col} from 'antd';

export default class Footer extends React.Component {

    render() {
        const style = {"marginTop": '10%'}
        return (
            <footer style={style}>
                <Row>
                    <Col span={2}></Col>
                    <Col span={20} className='footer'>
                       &copy;&nbsp;2017 . All Rights Reserved.
                    </Col>
                    <Col span={2}></Col>
                </Row>
            </footer>
        )
    }
}
