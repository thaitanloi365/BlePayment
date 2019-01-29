import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Platform
} from "react-native";
import { OverlayProps } from "Types";
import { Device } from "Utils";

const { width, height } = Device.getScreenSize();

type Props = OverlayProps;

const Overlay: React.SFC<Props> = props => {
  const { style, containerStyle, visible, children, onPressOutside } = props;
  if (!visible) return null;
  return (
    <TouchableWithoutFeedback onPress={onPressOutside}>
      <View style={[styles.fill, style]}>
        <TouchableWithoutFeedback>
          <View style={[styles.container, containerStyle]}>{children}</View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  fill: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    ...Platform.select({
      ios: { zIndex: 5 },
      android: { elevation: 5 }
    })
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 4,
    maxWidth: width - 20,
    maxHeight: height - 20
  }
});

Overlay.defaultProps = {
  visible: false
};

export default Overlay;
