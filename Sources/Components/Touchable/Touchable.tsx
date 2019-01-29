import React from "react";
import {
  TouchableOpacity,
  TouchableNativeFeedback,
  View,
  TouchableWithoutFeedback
} from "react-native";
import { TouchableProps } from "Types";
import { Device } from "Utils";

type Props = TouchableProps;
const Touchable: React.SFC<Props> = props => {
  const {
    style,
    children,
    onPress,
    activeOpacity,
    useForeground,
    boundedRipple,
    hitSlop,
    type
  } = props;

  if (type == "native") {
    if (Device.isAndroid()) {
      const background =
        Device.version() >= 21
          ? TouchableNativeFeedback.Ripple("ThemeAttrAndroid", !boundedRipple)
          : TouchableNativeFeedback.SelectableBackground();
      return (
        <TouchableNativeFeedback
          background={background}
          onPress={onPress}
          useForeground={useForeground}
          hitSlop={hitSlop}
        >
          <View style={style}>{children}</View>
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity}
        hitSlop={hitSlop}
        style={style}
      >
        {children}
      </TouchableOpacity>
    );
  } else if (type == "opacity") {
    return (
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={activeOpacity}
        hitSlop={hitSlop}
        style={style}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <TouchableWithoutFeedback onPress={onPress} hitSlop={hitSlop} style={style}>
      {children}
    </TouchableWithoutFeedback>
  );
};

Touchable.defaultProps = {
  activeOpacity: 0.6,
  boundedRipple: true,
  useForeground: false,
  hitSlop: { bottom: 15, left: 15, right: 15, top: 15 },
  type: "native"
};
export default Touchable;
