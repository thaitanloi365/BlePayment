import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import Assets from "Assets";

const SplashScreen = () => {
  return (
    <ImageBackground
      source={Assets.images.splashScreen}
      style={StyleSheet.absoluteFill}
    />
  );
};

SplashScreen.displayName = "Custom SplashScreen";

export default SplashScreen;
