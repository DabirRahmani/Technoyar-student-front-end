import React, { useEffect, useState } from "react";
import { View, Switch } from "react-native";
import { colors } from "../configs";
import MainBox from "./MainBox";
import { MeduimMainButton } from "./MainButtons";
import MainTexts from "./MainTexts";
import PaymentRenderer from "./PaymentRenderer";
import PenaltyCard from "./PenaltyCard";

const PenaltyRenderer = ({ list = [], reload }) => {
  const [showUnPaid, setShowUnPaid] = useState(true);
  const [cart, setCart] = useState([]);

  const [expanded, setExpanded] = useState(10);

  const [showAll, setShowAll] = useState(true);

  const [paymentModalStatus, setPaymentModalStatus] = useState(false);

  useEffect(() => {
    setExpanded(list.length);
  }, [list.length]);

  var total = 0;

  for (var i = 0; i < cart.length; i++) {
    total = total + +cart[i].amount;
  }

  var buyBtnStatus = false;

  if (total !== 0) buyBtnStatus = true;

  var listt = list.sort((a, b) => {
    if (a.id < b.id) return true;
    else return false;
  });

  const addCart = (item) => {
    setCart([...cart, item]);
  };

  const delCart = (item) => {
    setCart(cart.filter((c) => c.id !== item.id));
  };

  return (
    <View>
      <MainBox>
        <View style={{ alignItems: "center" }}>
          <View style={{ flexDirection: "row-reverse" }}>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MainTexts.MainTitleTexts title="جریمه ها" />
            </View>

            <View
              style={{
                flex: 1.5,
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ flexDirection: "row" }}>
                <View>
                  <Switch
                    trackColor={{
                      false: colors.background,
                      true: colors.complementBoldThird,
                    }}
                    thumbColor={
                      showUnPaid
                        ? colors.complementBoldThirdOnPressEffect
                        : colors.darkgrayiconsitems
                    }
                    value={showUnPaid}
                    onValueChange={() => setShowUnPaid(!showUnPaid)}
                    ios_backgroundColor={colors.lightLayerBackGround}
                  />
                </View>
                <View>
                  <MainTexts.MainSecondTitleTexts title="‌نمایش پرداخت نشده‌ها" />
                </View>
              </View>
            </View>
          </View>

          <View style={{ flex: 1, width: "100%", marginTop: 8 }}>
            {listt
              .filter((l) => {
                if (showUnPaid) return !l.penaltyPayed;
                return true;
              })
              .slice(0, expanded)
              .map((l) => (
                <PenaltyCard
                  key={l.id}
                  id={l.id}
                  amount={l.penalty}
                  title={l.penaltyExplanation}
                  isPaid={l.penaltyPayed}
                  isInCart={cart.filter((c) => c.id === l.id).length > 0}
                  addcart={addCart}
                  delcart={delCart}
                />
              ))}

            <View
              style={{
                flexDirection: "row",
                width: "100%",
                justifyContent: "flex-end",
              }}
            >
              <View style={{}}>
                <Switch
                  trackColor={{
                    false: colors.background,
                    true: colors.complementBoldThird,
                  }}
                  thumbColor={
                    showAll
                      ? colors.complementBoldThirdOnPressEffect
                      : colors.darkgrayiconsitems
                  }
                  value={showAll}
                  onValueChange={() => {
                    setShowAll(!showAll);
                    if (expanded === 5) setExpanded(list.length);
                    else setExpanded(5);
                  }}
                  ios_backgroundColor={colors.lightLayerBackGround}
                />
              </View>
              <View>
                <MainTexts.MainSecondTitleTexts title="نمایش همه" />
              </View>
            </View>
          </View>

          <View
            style={{
              width: "100%",
              flexDirection: "column",
              marginVertical: 16,
              alignItems: "center",
            }}
          >
            <View
              style={{
                flex: 1,
                marginBottom: 4,
              }}
            >
              <MainTexts.MainSecondTitleTexts
                title={"مجموع: " + total + " تومان "}
              />
            </View>
            <View style={{ alignItems: "center" }}>
              <MeduimMainButton
                disable={!buyBtnStatus}
                title="   پرداخت   "
                onPress={() => {
                  setPaymentModalStatus(true);
                }}
              />
            </View>
          </View>
        </View>
      </MainBox>

      {paymentModalStatus === true ? (
        <PaymentRenderer
          visibalityStatus={paymentModalStatus}
          changeStatus={setPaymentModalStatus}
          list={cart}
          total={total}
          reload={reload}
        />
      ) : (
        <View></View>
      )}
    </View>
  );
};

export default PenaltyRenderer;
