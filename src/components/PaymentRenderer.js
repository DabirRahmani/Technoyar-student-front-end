import React from "react";
import { View, StyleSheet, Modal, Text } from "react-native";
import MainScreen from "../screens/mainScreen";
import MainTexts from "./MainTexts";

const PaymentRenderer = ({
  visibalityStatus,
  changeStatus,
  list = [],
  total,
}) => {
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
        <MainTexts.MainContextSubTexts title="پرداخت آیتم‌های زیر:" />
        {list.map((l) => (
          <View key={l.id}>
            <MainTexts.MainContextSubTexts title={l.title} />
          </View>
        ))}
        <MainTexts.MainContextSubTexts
          title={" مبلغ کل: " + total + " تومان "}
        />
      </MainScreen>
    </Modal>
  );
};

export default PaymentRenderer;
