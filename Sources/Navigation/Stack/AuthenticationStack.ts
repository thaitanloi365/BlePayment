import { createStackNavigator } from "react-navigation";
import { Login, Start, Home } from "Screens";

const AuthenticationStack = createStackNavigator(
  {
    Login: Login
  },
  {
    initialRouteName: "Login"
  }
);

export default AuthenticationStack;
