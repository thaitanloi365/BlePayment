import React from "react";
import { ActivityIndicator } from "react-native";
import { Overlay } from "Components";

type Props = {};
type State = {
  visible: boolean;
};

class Loading extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false
    };
  }
  show = () => this.setState({ visible: true });
  hide = (onClose?: () => void) => {
    this.setState({ visible: false }, () => {
      if (onClose) onClose();
    });
  };

  render() {
    const { visible } = this.state;
    return (
      <Overlay visible={visible}>
        <ActivityIndicator size="large" color="white" />
      </Overlay>
    );
  }
}

export default Loading;
