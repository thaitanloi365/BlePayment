import React from "react";
import { Touchable, Text } from "Components";
import { ButtonProps } from "Types";
import { StyleSheet } from "react-native";

type Props = ButtonProps;

const Button: React.SFC<Props> = props => {
  const { text, textStyle, style, ...other } = props;
  return (
    <Touchable style={[styles.button, style]} {...other}>
      <Text text={text} style={textStyle} />
    </Touchable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4
  }
});
export default Button;
