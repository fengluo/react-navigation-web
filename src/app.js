import { Icon, Button } from "antd-mobile";

import CruiseDetail from "./views/CruiseDetail";
import Home from "./views/Home";
import Search from "./views/Search";
import Profile from "./views/Profile";
// import TabNavigator from "./navigation/TabNavigator";
// import StackNavigator from "./navigation/StackNavigator";
import { StackNavigator, TabNavigator } from "react-navigation";

const HomeTab = StackNavigator(
  {
    Home: {
      screen: Home,
      path: "",
      navigationOptions: {
        title: "Welcome"
      }
    },
    CruiseDetail: {
      screen: CruiseDetail,
      path: "cruises/:cruiseId"
    }
  },
  {
    initialRouteName: "Home"
    // tabBarOptions: {
    //   inactiveTintColor: '#108ee9',
    //   activeTintColor: '#888',
    // },
  }
);

const AppNavigator = TabNavigator(
  {
    HomeTab: {
      screen: HomeTab,
      path: "",
      navigationOptions: {
        tabBarLabel: "首页",
        tabBarIcon: <Icon type={require("./icons/home.svg")} />
      }
    },
    Search: {
      screen: Search,
      path: "search"
    },
    Profile: {
      screen: Profile,
      path: "profile"
    }
  },
  {
    // initialRouteName: "HomeTab",
    tabBarOptions: {
      inactiveTintColor: "#108ee9",
      activeTintColor: "#888"
    }
  }
);

export default AppNavigator;
