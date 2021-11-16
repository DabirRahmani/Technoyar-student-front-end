import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  TouchableOpacity,
  Linking,
  Image,
} from "react-native";
import CreatePaymentPortalLinkRequest from "../backend/createPortalLinkRequest";
import PaymentDetails from "../backend/paymentDetails";
import { colors } from "../configs";
import MainScreen from "../screens/mainScreen";
import MainBox from "./MainBox";
import { LargeMainButton } from "./MainButtons";
import MainSnack from "./MainSnack";
import MainTexts from "./MainTexts";

const PaymentRenderer = ({
  visibalityStatus,
  changeStatus,
  reload,
  list = [],
  total,
}) => {
  const [payButtonStatus, setPayButtonStatus] = useState(true);
  const [loading, setLoading] = useState(true);

  const [portalLink, setPortalLink] = useState("");

  const [portalID, setPortalID] = useState();

  const [createPortalPressed, setCreatePrtalPressed] = useState(false);

  const [createPrtalSnackStatus, setCreatePortalSnackStatus] = useState(false);

  const [createPortalSnackTitle, setCreatePortalSnackTitle] = useState("");

  const [createPortalSnackType, setCreatePortalSnackType] = useState(false); //false: warning, true:success

  const [waitingForResponse, setWaitingForResponse] = useState(false);

  const [paymentStatus, setPaymentStatus] = useState(false);

  const [portalStatusTitle, setPortalStatusTitle] = useState("");

  const [interVal, setinterval] = useState();

  const CreatePaymentPortal = () => {
    setPayButtonStatus(false);
    setLoading(true);

    setCreatePrtalPressed(true);

    var v = "";
    for (var i = 0; i < list.length; i++) v = v + +list[i].id + ",";

    v = v.substring(0, v.length - 1);

    CreatePaymentPortalLinkRequest({
      datacaller: (data) => {
        console.log("link:");
        console.log(data);
        setLoading(false);
        if (data.err) {
          setCreatePrtalPressed(false);
          setCreatePortalSnackType(false);
          setCreatePortalSnackStatus(true);
          setCreatePortalSnackTitle(
            "خطا در ارتباط با سرور، اتصال به اینترنت را بررسی کنید"
          );
          setPayButtonStatus(true);
        } else if (data === "error") {
          setCreatePrtalPressed(false);
          setPayButtonStatus(true);

          setCreatePortalSnackType(false);
          setCreatePortalSnackStatus(true);

          setCreatePortalSnackTitle(
            "خطا در ارتباط با سرور، اتصال به اینترنت را بررسی کنید"
          );
        } else {
          if (data.id === undefined) {
            setCreatePrtalPressed(false);
            setPayButtonStatus(true);

            setCreatePortalSnackType(false);
            setCreatePortalSnackStatus(true);

            setCreatePortalSnackTitle("خطایی رخ داده است. دوباره امتحان کنید");
          } else {
            setCreatePortalSnackType(true);
            setCreatePortalSnackStatus(false);
            setPortalLink(data.redirect);

            setPortalID(data.id);
          }
        }
      },
      penalties: v + "",
    });
  };

  const CreatePaymentPortalButton = () => {
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <MainTexts.MainContextSubTexts title="در حال ساخت درگاه پرداخت" />
          <Image
            style={{ marginTop: 8, width: 150, height: 150 }}
            source={require("./../assets/loading2.gif")}
          />
        </View>
      );
    } else
      return (
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            marginTop: 16,
          }}
        >
          <MainTexts.MainSecondTitleTexts title="پرداخت از طریق درگاه آیدی‌پی" />

          <Image
            style={{ width: 250, height: 80 }}
            source={require("./../assets/idapy.png")}
          />
          <View style={{ width: "50%" }}>
            <LargeMainButton
              onPress={() => {
                Linking.openURL(portalLink);
                setWaitingForResponse(true);

                setTimeout(() => {
                  CheckPaymentStatus();
                }, 10000);
              }}
              title="پرداخت"
            />
          </View>
        </View>
      );
  };

  const CheckPaymentStatus = () => {
    PaymentDetails({
      datacaller: (data) => {
        if (data.err) {
        } else if (data === "error") {
        } else {
          if (
            data.status === 100 ||
            data.status === 101 ||
            data.status === 200
          ) {
            setPortalStatusTitle(
              "پرداخت با موفقیت انجام شد، در حال بارگزاری مجدد"
            );
            setTimeout(() => {
              reload();
            }, 5000);
          } else if (data.status === 5) {
            setPortalStatusTitle(
              "پرداخت انجام نشده است. در صورت کسر شدن، مبلغ کسر شده طی 48 ساعت آینده برگشت داده خواهد شد"
            );
          } else if (
            data.status === 10 ||
            data.status === 8 ||
            data.status === 1
          ) {
            // در انتظار
            setTimeout(() => {
              CheckPaymentStatus();
            }, 10000);
          } else {
            setPortalStatusTitle(
              "خطایی رخ داده است. صورت کسر شدن، مبلغ کسر شده طی 48 ساعت آینده برگشت داده خواهد شد"
            );
          }
        }
      },
      id: portalID,
    });
  };

  const CreateWaitigForResponsePanel = () => {
    if (!waitingForResponse)
      return (
        <View>
          <MainTexts.MainContextSubTexts title={portalStatusTitle} />
        </View>
      );

    if (portalStatusTitle !== "")
      return (
        <View
          style={{
            width: "80%",
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            paddingTop: 100,
          }}
        >
          <MainTexts.MainTitleTexts title={portalStatusTitle} />
        </View>
      );

    if (paymentStatus === false)
      return (
        <View
          style={{
            marginTop: 32,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MainTexts.MainSecondTitleTexts title="دریافت اطلاعات تراکنش از سرور" />
          <Image
            style={{ marginTop: 8, width: 150, height: 150 }}
            source={require("./../assets/loading2.gif")}
          />
        </View>
      );
    else if (paymentStatus === true)
      return (
        <View>
          <MainSnack
            success
            status={paymentStatus}
            setter={setPaymentStatus}
            title="با موفقیت انجام شد"
          />
        </View>
      );
  };

  return (
    <Modal
      statusBarTranslucent={true}
      visible={visibalityStatus}
      animationType="slide"
      onRequestClose={() => {
        changeStatus(false);
        clearInterval(interVal);
      }}
    >
      <MainScreen>
        <View
          style={{
            marginBottom: 8,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              changeStatus(false);
              clearInterval(interVal);
            }}
          >
            <MaterialCommunityIcons
              name="chevron-left"
              size={30}
              color={colors.titlePrimary}
            />
            <MainTexts.MainTitleTexts title="بازگشت" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={{ marginHorizontal: 16, marginTop: 16 }}>
            <MainBox>
              <View>
                <MainTexts.MainTitleTexts title="پرداخت آیتم‌های زیر:" />
                {list.map((l) => (
                  <View style={{ marginTop: 8 }} key={l.id}>
                    <MainTexts.MainContextSubTexts title={l.title} />
                  </View>
                ))}

                <View
                  style={{
                    flexDirection: "row",
                    marginVertical: 8,

                    borderTopWidth: 1,
                    borderColor: colors.darkgrayiconsitems,
                    paddingTop: 8,
                    justifyContent: "space-between",
                  }}
                >
                  <View style={{ flex: 1 }}>
                    <LargeMainButton
                      disable={!payButtonStatus}
                      onPress={() => {
                        CreatePaymentPortal();
                        //CheckPaymentStatus();
                      }}
                      title="ساخت درگاه پرداخت"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <MainTexts.MainTitleTexts
                      title={" مبلغ کل: " + total + " تومان "}
                    />
                  </View>
                </View>

                {createPrtalSnackStatus === true ? (
                  <View style={{ height: 50 }}>
                    <MainSnack
                      status={createPrtalSnackStatus}
                      setter={setCreatePortalSnackStatus}
                      title={createPortalSnackTitle}
                      warning
                    />
                  </View>
                ) : (
                  <View></View>
                )}
              </View>
            </MainBox>
          </View>

          {createPortalPressed === true && waitingForResponse === false ? (
            <View style={{ height: 300, marginTop: 32 }}>
              {CreatePaymentPortalButton()}
            </View>
          ) : (
            <View>{CreateWaitigForResponsePanel()}</View>
          )}
        </ScrollView>
      </MainScreen>
    </Modal>
  );
};

export default PaymentRenderer;
