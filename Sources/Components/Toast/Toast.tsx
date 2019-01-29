import React from "react";
import {
  Animated,
  StyleSheet,
  LayoutChangeEvent,
  Platform
} from "react-native";
import { Text } from "Components";
import { ToastProps } from "Types";
import { Device } from "Utils";
import Assets from "Assets";

type Props = ToastProps;
type State = {
  showing: boolean;
  height: number;
};

const statusBarHeight = Device.getStatusBarHeight(true);

class Toast extends React.Component<Props, State> {
  private animatedValue = new Animated.Value(0);
  static defaultProps: Props = {
    backgroundColor: Assets.colors.cherryRed,
    text: "Network is not available"
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      showing: false,
      height: 0
    };
  }

  private onLayout = (event: LayoutChangeEvent) => {
    if (this.state.height) return;
    const height = statusBarHeight + event.nativeEvent.layout.height;
    this.setState({ height });
  };

  show = () => {
    if (this.state.showing) return;
    Animated.timing(this.animatedValue, {
      toValue: 1,
      duration: 1000
    }).start(() => this.setState({ showing: true }));
  };

  hide = () => {
    if (!this.state.showing) return;
    Animated.timing(this.animatedValue, {
      toValue: 0,
      duration: 1000
    }).start(() => this.setState({ showing: false }));
  };

  render() {
    const { text, backgroundColor, textStyle } = this.props;
    const heightTranslate = this.animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0, this.state.height]
    });

    return (
      <Animated.View
        onLayout={this.onLayout}
        style={[
          styles.container,
          {
            backgroundColor,
            height: heightTranslate,
            opacity: this.animatedValue
          }
        ]}
      >
        <Text text={text} style={[styles.text, textStyle]} />
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: statusBarHeight,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    opacity: 0,
    ...Platform.select({
      ios: {
        shadowColor: "black",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        zIndex: 3
      },
      android: {
        elevation: 3
      }
    })
  },
  text: {
    fontSize: 15,
    fontFamily: Assets.fontFamily.roman,
    color: "white"
  }
});

export default Toast;
