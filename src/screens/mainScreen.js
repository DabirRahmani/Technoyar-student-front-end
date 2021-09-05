import React from "react";
import { StatusBar, StyleSheet, View } from "react-native";
import { colors } from "./../configs";

export default function MainScreen(probs) {
  StatusBar.setHidden(false);

  StatusBar.setBackgroundColor(colors.background);

  StatusBar.setBarStyle("light-content");

  return (
    <View style={[styles.container, { paddingTop: StatusBar.currentHeight }]}>
      {probs.children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
});
