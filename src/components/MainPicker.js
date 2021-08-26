import React from "react";
import { View, StyleSheet, Modal, ScrollView } from "react-native";
import { colors } from "../configs";
import MainScreen from "../screens/mainScreen";
import { MeduimMainButton } from "./MainButtons";

const MainPicker = ({ visibalityStatus, changeStatus, dataView }) => {
  return (
    <Modal
      statusBarTranslucent={true}
      visible={visibalityStatus}
      animationType="slide"
      onRequestClose={() => {
        changeStatus(false);
      }}
    >
      <MainScreen>
        <View
          style={{ backgroundColor: colors.background, flex: 1, padding: 16 }}
        >
          <MeduimMainButton
            title="بازگشت"
            onPress={() => {
              changeStatus(false);
            }}
          />
          <ScrollView style={{ marginTop: 8 }}>{dataView()}</ScrollView>
        </View>
      </MainScreen>
    </Modal>
  );
};

export default MainPicker;
