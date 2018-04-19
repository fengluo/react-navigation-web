import {
  TabRouter,
  addNavigationHelpers,
  createNavigator,
  createNavigationContainer
} from "react-navigation";

import TabView from "./TabView";

const TabNavigator = (routeConfigs, config) => {
  // Todo: add more tab config to TabNavigator.config
  const {
    tabBarComponent,
    tabBarPosition,
    tabBarOptions,
    swipeEnabled,
    animationEnabled,
    lazy,
    ...tabsConfig
  } = config;
  const router = TabRouter(routeConfigs, tabsConfig);
  const navigator = createNavigator(
    router,
    routeConfigs,
    config,
    "react-navigation/TABS"
  )((props: *) => (
    <TabView
      {...props}
      tabBarComponent={tabBarComponent}
      tabBarPosition={tabBarPosition}
      tabBarOptions={tabBarOptions}
      swipeEnabled={swipeEnabled}
      animationEnabled={animationEnabled}
      lazy={lazy}
    />
  ));
  return createNavigationContainer(navigator);
};

export default TabNavigator;
