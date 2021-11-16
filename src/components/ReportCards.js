import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { View, Text } from "react-native";
import { colors } from "../configs";
import MainTexts from "./MainTexts";

const ReportCards = ({ title, time, icon }) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.darkgrayiconsitems,
        padding: 8,
        justifyContent: "space-evenly",
        alignContent: "center",
        alignItems: "center",

        borderRadius: 16,
        overflow: "hidden",
        margin: 8,
      }}
    >
      <Text
        numberOfLines={1}
        style={{
          color: colors.titlePrimary,
          fontSize: 32,
          fontWeight: "bold",
        }}
      >
        {time}
      </Text>

      <MainTexts.MainSecoonderyContextSubTexts title={title} />
      <MaterialCommunityIcons
        name={icon}
        size={32}
        color={colors.titlePrimary}
        style={{ margin: 8 }}
      />
    </View>
  );
};

export default ReportCards;
