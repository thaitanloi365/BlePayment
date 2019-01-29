import { StyleSheet } from "react-native";
import Assets from "Assets";

function getProperty<T, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const baseStyles = {
  header: {
    backgroundColor: "black",
    fontSize: 24,
    fontFamily: Assets.fontFamily.roman
  },
  section: {
    backgroundColor: "black",
    fontSize: 20,
    fontFamily: Assets.fontFamily.roman
  },
  content: {
    backgroundColor: "black",
    fontSize: 16,
    fontFamily: Assets.fontFamily.roman
  },
  hint: {
    backgroundColor: Assets.colors.black,
    fontSize: 12,
    fontFamily: Assets.fontFamily.roman
  },
  textNormal: {
    backgroundColor: Assets.colors.darkSkyBlue,
    fontSize: 16,
    fontFamily: Assets.fontFamily.medium
  },
  textDanger: {
    backgroundColor: Assets.colors.grapefruit,
    fontSize: 16,
    fontFamily: Assets.fontFamily.medium
  }
};

function createOnlyStyle(key: keyof typeof baseStyles, overrides = {}) {
  const style: object = getProperty(baseStyles, key);
  return StyleSheet.create(Object.assign(style, overrides));
}

export function createStyles(key?: keyof typeof baseStyles, overrides = {}) {
  if (key) {
    return createOnlyStyle(key);
  }

  return StyleSheet.create(Object.assign(baseStyles, overrides));
}
