import React from 'react';
import {Badge} from 'antd-mobile';

class Tab extends React.Component {
  renderIcon = () => {
    const { dot, badge, selected, selectedIcon, icon, title, prefixCls } = this.props;
    // const iconRes = selected ? selectedIcon : icon;
    const iconRes = icon;
    const iconDom = React.isValidElement(iconRes) ? iconRes : (
      <img className={'am-tab-bar-image'} src={iconRes.uri || iconRes} alt={title} />
    );
    if (badge) {
      return (
        <Badge text={badge} className={'am-tab-bar-tab-badge tab-badge am-badge'}> {iconDom} </Badge>
      );
    }
    if (dot) {
      return (
        <Badge dot className={'am-tab-bar-badge tab-dot'}>{iconDom}</Badge>
      );
    }
    return iconDom;
  }
  render() {
    const {
      title, prefixCls, selected, unselectedTintColor, tintColor,...restProps,
    } = this.props;
    const iconColor = selected ? tintColor : unselectedTintColor;
    return (
      <div className='am-tab-bar-tab' {...restProps}>
        <div className={'am-tab-bar-tab-icon'} style={{ color: iconColor }}>
          {this.renderIcon()}
        </div>
        <p className={'am-tab-bar-tab-title'} style={{ color: selected ? tintColor : unselectedTintColor }}>
          {title}
        </p>
      </div>
    );
  }
}

export default Tab;
