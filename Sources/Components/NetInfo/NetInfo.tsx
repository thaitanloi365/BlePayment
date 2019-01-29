import React from "react";
import { NetInfo as RNNetInfo, Platform } from "react-native";
import { Toast } from "Components";

type Props = {};
type State = {
  isConnected: boolean;
};

class NetInfo extends React.Component<Props, State> {
  private toastRef = React.createRef<Toast>();
  constructor(props: Props) {
    super(props);
    this.state = {
      isConnected: true
    };
  }
  componentDidMount() {
    RNNetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
    if (Platform.OS == "android") {
      RNNetInfo.isConnected.fetch().then(isConnected => {
        this.handleConnectionChange(isConnected);
      });
    }
  }

  componentWillUnmount() {
    RNNetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  private handleConnectionChange = (isConnected: boolean) => {
    this.setState({ isConnected });
    if (this.toastRef.current) {
      if (isConnected) {
        this.toastRef.current.hide();
      } else {
        this.toastRef.current.show();
      }
    }
  };
  render() {
    return <Toast ref={this.toastRef} text="Network is not available" />;
  }
}

export default NetInfo;
