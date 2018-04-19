import React from 'react';
import {Icon, Button} from 'antd-mobile';

let pageIndex = 0;

export default class Home extends React.Component {
  static navigationOptions = {
    title: '麦兔邮轮',
    tabBarLabel: '首页',
    tabBarIcon: (<Icon type={require('../icons/home.svg')} />)
  }

  // constructor(props) {
  //   super(props);
  //   // this.props.changeTitle('首页')
  // }

  render() {
    return (
      <div>
        Home
        <button onClick={() => this.props.navigation.navigate('CruiseDetail', {cruiseId: 0})}>跳转</button>
      </div>
    );
  }
}
