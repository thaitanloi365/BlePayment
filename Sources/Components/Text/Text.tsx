import React from "react";
import { Text as RNText, StyleSheet } from "react-native";
import { TextProps } from "Types";

type Props = TextProps;
const Text: React.SFC<Props> = props => {
  const { text, children, style } = props;
  const c = children || text;
  return <RNText style={[styles.text, style]}>{c}</RNText>;
};

Text.defaultProps = {
  text: "Custom Text"
};

Text.displayName = "Custom Text";

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    fontFamily: "Avenir",
    color: "white"
  }
});

export default Text;
