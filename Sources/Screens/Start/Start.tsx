import React from "react";
import { View } from "react-native";
import { Navigator } from "Navigation";
import { Text } from "Components";

class Start extends React.Component {
  componentDidMount() {
    setTimeout(() => {
      Navigator.navTo("Home");
    }, 2000);
  }
  render() {
    return (
      <View style={{ backgroundColor: "gray" }}>
        <Text text="start" />
      </View>
    );
  }
}

export default Start;
