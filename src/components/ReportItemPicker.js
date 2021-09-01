import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../configs";
import { MeduimMainButton } from "./MainButtons";

const ReportItemPicker = ({ id, date, choose, present }) => {
  var v = date + "";

  if (!present) {
    return (
      <View key={id} style={{ margin: 8, paddingHorizontal: 32 }}>
        <MeduimMainButton
          title={v.replace(/-/g, "/")}
          onPress={() => {
            choose(id);
          }}
          backgroundColor={colors.darkgrayiconsitems}
        />
      </View>
    );
  }

  return (
    <View key={id} style={{ margin: 8, paddingHorizontal: 32 }}>
      <MeduimMainButton
        title={v.replace(/-/g, "/")}
        onPress={() => {
          choose(id);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ReportItemPicker;
