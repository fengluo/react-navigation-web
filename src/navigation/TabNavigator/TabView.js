import React from "react";
import { NavBar, Icon } from "antd-mobile";
import { addNavigationHelpers } from "react-navigation";
import Tab from "./Tab";
import "./index.less";

export default class TabView extends React.PureComponent {
  _handlePageChanged = index => {
    const { navigation } = this.props;
    navigation.navigate(navigation.state.routes[index].routeName);
  };

  _renderScene = ({ route }) => {
    console.log(route);
    const { screenProps } = this.props;
    const childNavigation = this.props.childNavigationProps[route.key];
    const TabComponent = this.props.router.getComponentForRouteName(
      route.routeName
    );
    return (
      <div style={styles.page}>
        <SceneView
          screenProps={screenProps}
          component={TabComponent}
          navigation={childNavigation}
        />
      </div>
    );
  };

  render() {
    const {
      router,
      tabBarComponent,
      tabBarPosition,
      animationEnabled,
      swipeEnabled,
      tabBarOptions,
      lazy,
      screenProps
    } = this.props;
    // console.log(this.props)
    const { state } = this.props.navigation;
    console.log(state);
    const Component = router.getComponentForState(state);

    const { routes, index } = state;
    const { dispatch } = this.props.navigation;
    // console.log(routes, index)
    // console.log(routes[index])
    let childNavigation = { dispatch, state: routes[index] };
    childNavigation = addNavigationHelpers(childNavigation);
    // const childNavigation = this.props.childNavigationProps[routes[index].key];
    console.log(childNavigation.state);
    childNavigation.state.params = routes[index].index
      ? routes[index].routes[routes[index].index].params
      : {};
    const options = router.getScreenOptions(childNavigation, {});
    // console.log(state.routes[state.index])
    return (
      <div style={{ marginTop: "0.9rem" }}>
        <NavBar
          mode="light"
          iconName={
            childNavigation.state.index && childNavigation.state.index > 1
              ? "left"
              : false
          }
          onLeftClick={() => {
            this.props.navigation.goBack(null);
          }}
        >
          {options.title}
        </NavBar>
        {/* <Component navigation={screenNavigation} /> */}
        <Component
          {...this.props}
          tabBarComponent={tabBarComponent}
          tabBarPosition={tabBarPosition}
          tabBarOptions={tabBarOptions}
          swipeEnabled={swipeEnabled}
          animationEnabled={animationEnabled}
          lazy={lazy}
          navigation={childNavigation}
        />
        {/* { this._renderScene(state.routes[state.index])} */}
        <div className="am-tab-bar-bar" style={{ backgroundColor: "white" }}>
          {state.routes.map((route, index) => {
            {
              /* console.log(route) */
            }
            const screenOptions = router.getScreenOptions(
              addNavigationHelpers({
                ...this.props.navigation,
                state: state.routes[index]
                // dispatch: navigation.dispatch,
              }),
              {}
            );
            return (
              <Tab
                title={screenOptions.tabBarLabel}
                icon={screenOptions.tabBarIcon}
                tintColor={tabBarOptions.inactiveTintColor}
                unselectedTintColor={tabBarOptions.activeTintColor}
                selected={state.index == index}
                prefixCls={"am-tab-bar"}
                onClick={() => {
                  this.props.navigation.navigate(route.key);
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
