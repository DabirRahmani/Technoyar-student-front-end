import React, { useState } from "react";
import { Button, StatusBar, StyleSheet, Text, View } from "react-native";
import MainButtons from "./../components/MainButtons";
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
