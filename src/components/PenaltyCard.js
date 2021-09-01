import React, { useState } from "react";
import { View } from "react-native";
import { colors } from "../configs";
import { SmallMainButton } from "./MainButtons";
import MainTexts from "./MainTexts";

const PenaltyCard = ({
  id,
  isPaid,
  isInCart,
  title,
  amount,
  delcart,
  addcart,
}) => {
  const add = () => {
    addcart({ id: id, amount: amount, title: title });
  };
  const del = () => {
    delcart({ id: id });
  };

  const CreateButton = () => {
    if (!isPaid) {
      if (!isInCart)
        return <SmallMainButton onPress={add} title="  افزودن به سبد  " />;
      else
        return (
          <SmallMainButton
            backgroundColor={colors.darkgrayiconsitems}
            onPress={del}
            title="  حـذف از سـبـد  "
          />
        );
    } else
      return <MainTexts.MainSecoonderyContextSubTexts title="پرداخت شده" />;
  };

  return (
    <View style={{ flexDirection: "row-reverse", marginVertical: 4 }}>
      <View style={{ width: "45%" }}>
        <MainTexts.MainContextSubTexts title={title} />
      </View>
      <View
        style={{
          width: "30%",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <MainTexts.MainSecoonderyContextSubTexts title="  تومان  " />
        <MainTexts.MainSecondTitleTexts title={amount} />
      </View>
      <View style={{ width: "25%" }}>
        <View style={{ marginHorizontal: 4, alignItems: "center" }}>
          {CreateButton()}
        </View>
      </View>
    </View>
  );
};

export default PenaltyCard;
