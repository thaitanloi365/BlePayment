import React from "react";
import { View } from "react-native";
import { Text } from "Components";

class Home extends React.Component {
  render() {
    return (
      <View style={{ backgroundColor: "red" }}>
        <Text text="home" />
      </View>
    );
  }
}

export default Home;
