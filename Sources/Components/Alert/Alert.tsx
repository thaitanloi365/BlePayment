import React from "react";
import { Overlay, Text, Button } from "Components";
import { View, StyleSheet, Platform, Keyboard } from "react-native";
import { AlertProps } from "Types";
import Assets from "Assets";

type Props = AlertProps;

type State = {
  visible: boolean;
  content: string;
  confirm: boolean;
};

class Alert extends React.Component<Props, State> {
  private onClose?: () => void;
  private onOk?: () => void;
  private onCancel?: () => void;

  static defaultProps: Props = {
    positiveButtonText: "OK",
    negativeButtonText: "Cancel",
    positiveButtonStyle: { flex: 1 },
    negativeButtonStyle: { flex: 1 }
  };
  constructor(props: Props) {
    super(props);
    this.state = {
      visible: false,
      content: "Are you sure?",
      confirm: false
    };
  }

  show = (msg: string, onClose?: () => void) => {
    Keyboard.dismiss();
    this.setState({ visible: true, content: msg, confirm: false }, () => {
      this.onClose = onClose;
    });
  };

  confirm = (msg: string, onOk?: () => void, onCancel?: () => void) => {
    Keyboard.dismiss();
    this.setState({ visible: true, content: msg, confirm: true }, () => {
      this.onOk = onOk;
      this.onCancel = onCancel;
    });
  };

  private onOkPressed = () => {
    this.setState({ visible: false }, () => {
      if (this.state.confirm) {
        if (this.onOk) this.onOk();
      } else {
        if (this.onClose) this.onClose();
      }
    });
  };

  private onCancelPressed = () => {
    this.setState({ visible: false }, () => {
      if (this.onCancel) this.onCancel();
    });
  };

  render() {
    const { visible, content, confirm } = this.state;
    const {
      positiveButtonText,
      positiveButtonStyle,
      negativeButtonStyle,
      negativeButtonText
    } = this.props;
    return (
      <Overlay visible={visible}>
        <View style={styles.container}>
          <Text style={styles.content} text={content} />
          <View style={styles.seperator} />
          <View style={styles.buttonContainer}>
            <Button
              onPress={this.onOkPressed}
              style={positiveButtonStyle}
              text={positiveButtonText}
              textStyle={styles.okButton}
            />
            {confirm && (
              <Button
                onPress={this.onCancelPressed}
                style={negativeButtonStyle}
                text={negativeButtonText}
                textStyle={styles.cancelButton}
              />
            )}
          </View>
        </View>
      </Overlay>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    ...Platform.select({
      android: {
        elevation: 4
      },
      ios: {
        shadowColor: "#000000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 9
      }
    }),
    borderRadius: 14
  },
  content: {
    paddingTop: 16,
    paddingHorizontal: 30,
    fontSize: 13,
    fontFamily: Assets.fontFamily.medium,
    textAlign: "center"
  },
  seperator: {
    borderBottomColor: Assets.colors.silver,
    borderBottomWidth: 1,
    marginTop: 12
  },
  buttonContainer: {
    paddingVertical: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "stretch"
  },
  okButton: {
    fontSize: 18,
    fontFamily: Assets.fontFamily.medium,
    color: Assets.colors.lightblue
  },
  cancelButton: {
    fontSize: 18,
    fontFamily: Assets.fontFamily.medium,
    color: Assets.colors.cherryRed
  }
});

export default Alert;
