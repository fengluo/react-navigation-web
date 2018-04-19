import {
  StackRouter,
  addNavigationHelpers,
  createNavigator,
  createNavigationContainer
} from "react-navigation";

// import StackView from "./StackView";

export default (routeConfigMap, stackConfig) => {
  const {
    initialRouteName,
    initialRouteParams,
    paths,
    headerMode,
    mode,
    cardStyle,
    transitionConfig,
    onTransitionStart,
    onTransitionEnd,
    navigationOptions
  } =
    stackConfig || {};

  const stackRouterConfig = {
    initialRouteName,
    initialRouteParams,
    paths,
    navigationOptions
  };

  const router = StackRouter(routeConfigMap, stackRouterConfig);

  const navigator = createNavigator(
    router,
    routeConfigMap,
    stackConfig,
    "react-navigation/STACK"
  )(props => (
    <StackView
      {...props}
      headerMode={headerMode}
      mode={mode}
      cardStyle={cardStyle}
      transitionConfig={transitionConfig}
      onTransitionStart={onTransitionStart}
      onTransitionEnd={onTransitionEnd}
    />
  ));
  return createNavigationContainer(navigator);
};
