import {
  TextProps as RNTextProps,
  TouchableOpacityProps,
  StyleProp,
  ViewStyle,
  ViewProps,
  TouchableNativeFeedbackProps,
  BackgroundPropType,
  TextStyle
} from "react-native";

export type AlertProps = ViewProps & {
  positiveButtonText?: string;
  positiveButtonStyle?: StyleProp<ViewStyle>;
  negativeButtonText?: string;
  negativeButtonStyle?: StyleProp<ViewStyle>;
};

export type ButtonProps = TouchableProps & {
  text?: React.ReactText;
  textStyle?: StyleProp<TextStyle>;
};

export type TextProps = RNTextProps & {
  text?: React.ReactText;
};

export type ToastProps = ViewProps & {
  text: string;
  textStyle?: StyleProp<TextStyle>;
  backgroundColor?: string;
};

type TouchableExtrasProps =
  | TouchableOpacityProps
  | TouchableNativeFeedbackProps;

export type TouchableProps = ViewProps & {
  type?: "native" | "opacity" | "none";
  activeOpacity?: number;
  background?: BackgroundPropType;
  useForeground?: boolean;
  boundedRipple?: boolean;
  onPress?: () => void;
};

export type OverlayProps = ViewProps & {
  onPressOutside?: () => void;
  visible?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};
