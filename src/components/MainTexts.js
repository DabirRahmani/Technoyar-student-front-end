import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../configs";
import * as Clipboard from "expo-clipboard";

const MainTitleTexts = ({ title }) => {
  return <Text style={styles.title}>{title}</Text>;
};

const MainSecondTitleTexts = ({ title }) => {
  return <Text style={styles.sectitle}>{title}</Text>;
};

const MainContextSubTexts = ({ title, submited, pressable, isCopied }) => {
  if (submited === true) {
    const c = " (تاییدنشده) ";
    return (
      <View>
        <Text style={styles.sub}>
          {title}
          <Text style={{ color: colors.danger }}>{c}</Text>
        </Text>
      </View>
    );
  }
  if (pressable)
    return (
      <Text
        onLongPress={() => {
          Clipboard.setString(title);
          isCopied();
        }}
        style={styles.sub}
      >
        {title}
      </Text>
    );

  return <Text style={styles.sub}>{title}</Text>;
};

const MainSecoonderyContextSubTexts = ({ title }) => {
  return <Text style={styles.secsub}>{title}</Text>;
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    color: colors.titlePrimary,
    fontWeight: "bold",
  },
  sectitle: {
    fontSize: 16,
    color: colors.titlePrimary,
    fontWeight: "bold",
  },
  sub: {
    fontSize: 16,
    color: colors.contextSecondery,
  },
  secsub: {
    fontSize: 14,
    color: colors.contextSecondery,
  },
});

export default {
  MainTitleTexts,
  MainContextSubTexts,
  MainSecondTitleTexts,
  MainSecoonderyContextSubTexts,
};
