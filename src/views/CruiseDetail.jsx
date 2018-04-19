import React from 'react';
import { observer } from 'mobx-react';
import app from '../store/AppStore'
import {Icon } from 'antd-mobile';

@observer
export default class CruiseDetail extends React.Component{
    static navigationOptions = {
        title: '航次详情'
    }
    constructor(props) {
        super(props);
        // const app = this.props.app
    }

    render(){
        // console.log(this.props)
        const { params } = this.props.navigation.state;
        // console.log(params)
        return(
            <div>
                <h3>航次详情</h3>
                <p>这是详情</p>
                <p>{params.cruiseId}</p>
            </div>
        )
    }
}