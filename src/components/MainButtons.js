import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Button,
  TouchableOpacity,
  Text,
  TouchableHighlight,
} from "react-native";
import { colors } from "../configs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const MainButton = ({
  onPress,
  title,
  size,
  disable,
  backgroundColor = colors.complementBoldThird,
}) => {
  var op = 1;
  if (disable === true) {
    op = 0.5;
  }

  var underlayColor = colors.complementBoldThirdOnPressEffect;

  if (backgroundColor === colors.danger) {
    underlayColor = "#fa5757";
  }
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderRadius: size,
        overflow: "hidden",
        opacity: op,
      }}
    >
      <TouchableHighlight
        underlayColor={underlayColor}
        activeOpacity={1}
        disabled={disable}
        onPress={onPress}
      >
        <Text
          style={{
            color: colors.titlePrimary,
            fontSize: size * 2,
            textTransform: "uppercase",
            textAlign: "center",
            fontWeight: "900",
            opacity: op,
            padding: 2,
          }}
        >
          {title}
        </Text>
      </TouchableHighlight>
    </View>
  );
};

const SmallMainButton = ({ title, onPress, disable, backgroundColor }) => (
  <MainButton
    title={title}
    backgroundColor={backgroundColor}
    onPress={onPress}
    disable={disable}
    size={6}
  />
);

const MeduimMainButton = ({ title, onPress, disable, backgroundColor }) => {
  return (
    <MainButton
      title={title}
      onPress={onPress}
      disable={disable}
      size={8}
      backgroundColor={backgroundColor}
    />
  );
};

const LargeMainButton = ({ title, onPress, disable, backgroundColor }) => (
  <MainButton
    backgroundColor={backgroundColor}
    title={title}
    onPress={onPress}
    disable={disable}
    size={10}
  />
);

const MainIconButton = ({
  onPress,
  disable,
  name,
  size = 70,
  iconSize = 50,
  transParent,
}) => {
  var op = 1;
  if (disable === true) {
    op = 0.5;
  }

  var backgroundColor = "";
  if (transParent !== true) {
    backgroundColor = colors.complementBoldThird;
  }
  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        borderRadius: size / 2,
        overflow: "hidden",
        width: size,
        height: size,
        opacity: op,
      }}
    >
      <TouchableHighlight
        underlayColor={colors.complementBoldThirdOnPressEffect}
        activeOpacity={1}
        disabled={disable}
        onPress={onPress}
        style={{
          width: size,
          height: size,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <MaterialCommunityIcons
          name={name}
          size={iconSize}
          color={colors.titlePrimary}
        />
      </TouchableHighlight>
    </View>
  );
};

export { SmallMainButton, MeduimMainButton, LargeMainButton, MainIconButton };
