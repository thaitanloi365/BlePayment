import React from "React";
import { createStackNavigator, createAppContainer } from "react-navigation";
import { Start } from "Screens";
import AuthenticationStack from "../Stack/AuthenticationStack";
import HomeStack from "../Stack/HomeStack";

const RootStack = createStackNavigator(
  {
    Authentication: AuthenticationStack,
    Home: HomeStack,
    Start: Start
  },
  {
    initialRouteName: "Start",
    headerMode: "none",
    defaultNavigationOptions: {
      swipeEnabled: false,
      gesturesEnabled: false,
      header: null
    }
  }
);

export const AppContainer = createAppContainer(RootStack);
