import React from "react";
import { NavBar } from "antd-mobile";
import SceneView from "../SceneView";
import NavigationScenesReducer from "./ScenesReducer";
import "./index.less";
function isSceneActive(scene) {
  return scene.isActive;
}

export default class StackView extends React.Component {
  constructor(props) {
    super(props);
    // const app = this.props.app
    console.log("stack");
  }
  _screenDetails = {};

  componentWillReceiveProps(props) {
    if (props.screenProps !== this.props.screenProps) {
      this._screenDetails = {};
    }
    props.scenes.forEach(newScene => {
      if (
        this._screenDetails[newScene.key] &&
        this._screenDetails[newScene.key].state !== newScene.route
      ) {
        this._screenDetails[newScene.key] = null;
      }
    });
  }

  _getScreenDetails = scene => {
    const { screenProps, navigation, router } = this.props;
    let screenDetails = this._screenDetails[scene.key];
    console.log("secre");
    console.log(screenDetails);
    if (!screenDetails || screenDetails.state !== scene.route) {
      const screenNavigation = addNavigationHelpers({
        ...navigation,
        state: scene.route
      });
      screenDetails = {
        state: scene.route,
        navigation: screenNavigation,
        options: router.getScreenOptions(screenNavigation, screenProps)
      };
      this._screenDetails[scene.key] = screenDetails;
    }
    return screenDetails;
  };

  _getHeaderMode() {
    if (this.props.headerMode) {
      return this.props.headerMode;
    }
    // if (Platform.OS === 'android' || this.props.mode === 'modal') {
    //   return 'screen';
    // }
    return "float";
  }

  _renderHeader(scene, headerMode) {
    const { header } = this._getScreenDetails(scene).options;
    // console.log(scene)
    // console.log(header)
    if (typeof header !== "undefined" && typeof header !== "function") {
      return header;
    }
    const screenOptions = this._getScreenDetails(scene).options;
    // const renderHeader = header || ((header) => {<NavBar mode="light" >title</NavBar>});
    const renderHeader = () => (
      <NavBar mode="light">{screenOptions.title}</NavBar>
    );

    // // We need to explicitly exclude `mode` since Flow doesn't see
    // // mode: headerMode override below and reports prop mismatch
    const { mode, ...passProps } = this.props;
    return renderHeader({
      ...passProps,
      scene,
      mode: headerMode,
      getScreenDetails: this._getScreenDetails
    });
  }

  _renderInnerScene(SceneComponent, scene) {
    const { navigation } = this._getScreenDetails(scene);
    const { screenProps } = this.props;
    const headerMode = this._getHeaderMode();
    // if (headerMode === 'screen') {
    //   return (
    //     <View style={styles.container}>
    //       <View style={{ flex: 1 }}>
    //         <SceneView
    //           screenProps={screenProps}
    //           navigation={navigation}
    //           component={SceneComponent}
    //         />
    //       </View>
    //       {this._renderHeader(scene, headerMode)}
    //     </View>
    //   );
    // })
    return (
      <SceneView
        screenProps={this.props.screenProps}
        navigation={navigation}
        component={SceneComponent}
      />
    );
  }

  _renderCard = scene => {
    // const { screenInterpolator } = this._getTransitionConfig();
    // const style =
    //   screenInterpolator && screenInterpolator({ ...this.props, scene });

    const SceneComponent = this.props.router.getComponentForRouteName(
      scene.route.routeName
    );
    // const { navigation } = this._getScreenDetails(scene);
    return (
      // <div
      //   {...this.props}
      //   key={`card_${scene.key}`}
      //   // style={[style, this.props.cardStyle]}
      //   scene={scene}
      // >
      this._renderInnerScene(SceneComponent, scene)
      /* <SceneComponent navigation={navigation} /> */
      // </div>
    );
  };

  render() {
    this.props.scenes = NavigationScenesReducer(
      [],
      this.props.navigation.state
    );
    this.props.scene = this.props.scenes.find(isSceneActive);
    console.log("header");
    let floatingHeader = null;
    const headerMode = this._getHeaderMode();
    if (headerMode === "float") {
      console.log("float");
      floatingHeader = this._renderHeader(this.props.scene, headerMode);
    }
    const {
      navigation,
      position,
      layout,
      scene,
      scenes,
      mode,
      router
    } = this.props;
    const { state } = navigation;
    // console.log(navigation)

    // const Component = router.getComponentForState(state);

    // const screenNavigation = addNavigationHelpers({
    //   // In this case we use navigation.state.index because we want the title for the active route.
    //   // state: navigation.state.routes[navigation.state.index],
    //   ...navigation,
    //   state: state.routes[state.index],
    //   // dispatch: navigation.dispatch,
    // });

    // const { routes, index } = state;
    // const { dispatch } = this.props.navigation;
    // let childNavigation = { dispatch, state: routes[index] };
    // childNavigation = addNavigationHelpers(childNavigation);

    // const options = router.getScreenOptions(childNavigation, {});

    const SceneComponent = this.props.router.getComponentForRouteName(
      scene.route.routeName
    );
    const screenDetails = this._getScreenDetails(scene);

    return (
      <div style={{ marginTop: "0.9rem" }}>
        {/* <NavBar 
              mode="light"
              iconName={state.index == 0?false:'left'}
              onLeftClick={()=>{navigation.goBack(null)}}
            >
              {options.title}
            </NavBar> */}
        {floatingHeader}
        <div>
          <SceneComponent navigation={navigation} />
          {/* {scenes.map((s) => this._renderCard(s))} */}
        </div>
      </div>
    );
  }
}
