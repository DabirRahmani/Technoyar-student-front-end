import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Modal,
  TouchableHighlight,
} from "react-native";
import * as SecureStore from "expo-secure-store";

import RefreshRequest from "../backend/auth/refresh";
import MainBox from "../components/MainBox";
import {
  MainIconButton,
  MeduimMainButton,
  SmallMainButton,
} from "../components/MainButtons";
import MainPicker from "../components/MainPicker";
import MainTexts from "../components/MainTexts";
import { colors } from "../configs";
import MainScreen from "./mainScreen";
import ReportRequest from "../backend/report";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors } from "react-native/Libraries/NewAppScreen";

const Vview = ({ id, date, choose }) => {
  var v = date + "";

  return (
    <View style={{ margin: 8, paddingHorizontal: 32 }}>
      <MeduimMainButton
        title={v.replace(/-/g, "/")}
        onPress={() => {
          choose(id);
        }}
      />
    </View>
  );
};

const Ccard = ({ title, time, icon }) => {
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

const ConvertNumberToTime = ({ number }) => {
  if (number === null || number === undefined) return "0:00";

  var mod = number % 1;
  var integer = number - mod;

  mod = (mod * 3) / 5;

  if (mod === 0.3) mod = mod.toString() + "0";

  var modd = mod.toString().substring(2, 4);

  if (mod === 0) modd = "00";

  return "" + integer.toString() + ":" + modd;
};

export default HomeScreen = (props) => {
  const nnavigator = useNavigation();

  const [modalStatus, setModalStatus] = useState(false);

  const [reports, setReports] = useState([]);
  const [pickedReport, setPickedReport] = useState({});

  const getReports = (data) => {
    if (data.err) {
      nnavigator.replace("login", { err: "refreshError" });
    } else {
      if (data !== "error") {
        if (Object.values(data).length > 0) {
          var v = Object.values(data).sort((a, b) => {
            if (a.id > b.id) return -1;
          });
          setReports(v);
          setPickedReport(v[0]);
        }
      }
    }
  };

  useEffect(() => {
    ReportRequest({ datacaller: getReports });
  }, []);

  useEffect(() => {
    if (reports.length > 0) {
      reports.sort((a, b) => {
        if (a.id > b.id) return a;
      });
    }
  }, [reports]);

  const choosedate = (probs) => {
    setModalStatus(false);
    setPickedReport(reports.filter((r) => r.id === probs)[0]);
  };

  const CreateReportDatePicker = () => {
    return (
      <MainPicker
        visibalityStatus={modalStatus}
        changeStatus={setModalStatus}
        dataView={() => {
          return reports.map((d) => (
            <Vview key={d.id} choose={choosedate} id={d.id} date={d.day} />
          ));
        }}
      />
    );
  };

  const CreateDatePickerDate = () => {
    var v = pickedReport.day + "";

    return <MainTexts.MainContextSubTexts title={v.replace(/-/g, "/")} />;
  };

  const CreateReports = () => {
    return (
      <MainBox>
        <View style={{ direction: "rtl", width: "100%" }}>
          <View
            style={{
              flexDirection: "row-reverse",
              justifyContent: "space-between",
            }}
          >
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <MainTexts.MainTitleTexts title="گزارش روزانه" />
            </View>
            <View
              style={{
                width: "40%",
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 8,
                borderColor: colors.titlePrimary,
                padding: 4,
              }}
            >
              {CreateDatePickerDate()}

              <MainIconButton
                onPress={() => {
                  setModalStatus(true);
                }}
                name="menu-swap"
                size={32}
                iconSize={24}
                transParent
              />
            </View>
          </View>

          <View>
            <View style={{ width: "100%", marginTop: 16 }}>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "35%", maxWidth: "45%" }}>
                  <Ccard
                    title="مطالعه‌پیوسته"
                    time={ConvertNumberToTime({
                      number: pickedReport.mostContinuesStudyTime,
                    })}
                    icon="finance"
                    color={colors.background}
                  />
                </View>

                <Ccard
                  title="مطالعه"
                  time={ConvertNumberToTime({
                    number: pickedReport.studyTime,
                  })}
                  icon="book-open-page-variant"
                />
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <Ccard
                  title="فیلم آموزشی"
                  icon="cast-education"
                  color={colors.background}
                  time={ConvertNumberToTime({
                    number: pickedReport.timeUsedTotorials,
                  })}
                />
                <View style={{ width: "35%" }}>
                  <Ccard
                    title="استراحت"
                    icon="bed"
                    color={colors.background}
                    time={ConvertNumberToTime({
                      number: pickedReport.sleepingTime,
                    })}
                  />
                </View>
              </View>

              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: colors.darkgrayiconsitems,
                  margin: 8,
                  padding: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    paddingHorizontal: 32,
                  }}
                >
                  <MainTexts.MainTitleTexts title="ساعت ورود" />
                  <MainTexts.MainTitleTexts
                    title={pickedReport.enterTime ?? "ثبت نشده"}
                  />
                </View>
              </View>

              <View
                style={{
                  borderRadius: 16,
                  backgroundColor: colors.darkgrayiconsitems,
                  margin: 8,
                  padding: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    paddingHorizontal: 32,
                  }}
                >
                  <MainTexts.MainTitleTexts title="ساعت خروج" />
                  <MainTexts.MainTitleTexts
                    title={pickedReport.exitTime ?? "ثبت نشده"}
                  />
                </View>
              </View>
            </View>
          </View>

          <Text style={{ color: "tomato" }}>توضیحات و جریمه ها</Text>
        </View>

        {CreateReportDatePicker()}
      </MainBox>
    );
  };

  const CreateBottomIconButtons = () => {
    return (
      <>
        <View
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
          }}
        >
          <MainIconButton
            onPress={() => {
              console.log("********************");
            }}
            name="cog-outline"
          />
        </View>

        <View
          style={{
            position: "absolute",
            right: 16,
            bottom: 16,
          }}
        >
          <MainIconButton
            onPress={() => {
              ReportRequest({ datacaller: getReports });
            }}
            iconSize={40}
            name="message-text"
          />
        </View>
      </>
    );
  };

  return (
    <MainScreen>
      <View>
        <View
          style={{
            padding: 16,
            position: "absolute",
            width: "100%",
          }}
        >
          {CreateReports()}
        </View>
      </View>

      {CreateBottomIconButtons()}
    </MainScreen>
  );
};
