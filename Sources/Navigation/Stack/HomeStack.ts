import { createStackNavigator } from "react-navigation";
import { Home } from "Screens";

const HomeStack = createStackNavigator(
  {
    Home: Home
  },
  {
    initialRouteName: "Home"
  }
);

export default HomeStack;
