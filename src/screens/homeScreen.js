import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  ScrollView,
  RefreshControl,
} from "react-native";
import MainBox from "../components/MainBox";
import { MainIconButton } from "../components/MainButtons";
import MainPicker from "../components/MainPicker";
import MainTexts from "../components/MainTexts";
import { colors } from "../configs";
import MainScreen from "./mainScreen";
import ReportRequest from "../backend/report";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ReportItemPicker from "../components/ReportItemPicker";
import ReportCards from "../components/ReportCards";
import ConvertNumberToTime from "../components/ConvertNumberToTime";
import ExplainRequest from "../backend/explain";
import ExamRequest from "../backend/exam";
import ExamRenderer from "../components/ExamRenderer";
import ExplainRenderer from "../components/ExplainRenderer";
import ReportChartRenderer from "../components/ReportChartRenderer";
import PenaltyRenderer from "../components/PenaltyRenderer";
import PenaltyRequest from "../backend/penalty";
import MessageScreen from "./messageScreen";
import SettingScreen from "./settingScreen";
import UserDetailsRequest from "../backend/userDetails";
import AdminDetailsRequest from "../backend/adminDetails";
import RefreshRequest from "../backend/auth/refresh";
import * as SecureStore from "expo-secure-store";

const HomeScreen = (props) => {
  const nnavigator = useNavigation();

  const [modalStatus, setModalStatus] = useState(false);

  const [reports, setReports] = useState([]);

  const [pickedReport, setPickedReport] = useState({});

  const [explains, setExplains] = useState([]);

  const [exams, setExams] = useState([]);

  const [penalties, setPenalties] = useState([]);

  const [messageModalStatus, setMessageModalStatus] = useState(false);

  const [settingModalStatus, setSettingModalStatus] = useState(false);

  const [reportloaded, setreportloaded] = useState(false);

  const [examloaded, setexamloaded] = useState(false);

  const [explainloaded, setexplainloaded] = useState(false);

  const [penaltyloaded, setpenaltyloaded] = useState(false);

  const [adminDetails, setAdminDetails] = useState({});

  const [userDetails, setUserDetails] = useState({});

  const [reloadd, setReload] = useState(0);

  useEffect(() => {
    if (userDetails.role !== undefined && userDetails.role !== "")
      if (userDetails.role !== 1 && userDetails.role !== 2) {
        SecureStore.deleteItemAsync("refresh").then(() => {
          SecureStore.deleteItemAsync("token").then(() => {
            nnavigator.replace("login", { err: "refreshError" });
          });
        });
      }
  }, [userDetails]);

  /*
دریافت ریپورت ها و پر کردن متغیر ها
  */
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
        setreportloaded(true);
      }
    }
  };

  const getExplains = (data) => {
    if (data.err) {
      nnavigator.replace("login", { err: "refreshError" });
    } else {
      setExplains(Object.values(data));
      setexplainloaded(true);
    }
  };

  const getExams = (data) => {
    if (data.err) {
      nnavigator.replace("login", { err: "refreshError" });
    } else {
      setExams(Object.values(data));
      setexamloaded(true);
    }
  };

  const getPenalties = (data) => {
    if (data.err) {
      nnavigator.replace("login", { err: "refreshError" });
    } else {
      setPenalties(Object.values(data));
      setpenaltyloaded(true);
    }
  };

  const getUserDetails = (data) => {
    if (data.err) {
      nnavigator.replace("login", { err: "refreshError" });
    } else {
      setUserDetails(data);
    }
  };

  const getAdminDetails = (data) => {
    if (data.err) {
      nnavigator.replace("login", { err: "refreshError" });
    } else {
      setAdminDetails(data);
    }
  };

  const reload = () => {
    setReload(reloadd + 1);
    setreportloaded(false);
  };

  useEffect(() => {
    RefreshRequest({ calllerFunction: Requests });
  }, [reloadd]);

  const Requests = ({ token, err }) => {
    if (err) {
      nnavigator.replace("login", { err: "refreshError" });
    }
    ReportRequest({ datacaller: getReports, token: token });
    ExplainRequest({ datacaller: getExplains, token: token });
    ExamRequest({ datacaller: getExams, token: token });
    PenaltyRequest({ datacaller: getPenalties, token: token });
    UserDetailsRequest({ datacaller: getUserDetails, token: token });
    AdminDetailsRequest({ datacaller: getAdminDetails, token: token });
  };

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
            <ReportItemPicker
              key={d.id + "pick"}
              choose={choosedate}
              id={d.id}
              date={d.day}
              present={
                d.enterTime !== undefined &&
                d.enterTime !== null &&
                d.enterTime !== ""
              }
            />
          ));
        }}
      />
    );
  };

  const CreateDatePickerDate = () => {
    var v = pickedReport.day + "";
    if (pickedReport.day === undefined)
      return (
        <MainTexts.MainSecoonderyContextSubTexts title="هیچ تاریخی ثبت نشده" />
      );

    return <MainTexts.MainContextSubTexts title={v.replace(/-/g, "/")} />;
  };

  const CreateMessageModal = () => {
    if (messageModalStatus)
      return (
        <MessageScreen
          visibalityStatus={messageModalStatus}
          changeStatus={setMessageModalStatus}
          user={userDetails}
          admin={adminDetails}
        />
      );
  };

  const CreateSettingModal = () => {
    if (settingModalStatus)
      return (
        <SettingScreen
          changeStatus={setSettingModalStatus}
          visibalityStatus={settingModalStatus}
          user={userDetails}
          admin={adminDetails}
        />
      );
  };

  const CreatePenaltyRenderer = () => {
    if (penalties.length !== 0)
      return (
        <View style={{ padding: 4, marginTop: 16 }}>
          <PenaltyRenderer list={penalties} reload={reload} />
        </View>
      );

    return <View></View>;
  };

  const CreateChart = () => {
    if (reports.length < 3) return <View></View>;

    return (
      <View style={{ padding: 4, marginTop: 16 }}>
        <ReportChartRenderer list={reports} />
      </View>
    );
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
              <TouchableOpacity
                onPress={() => {
                  setModalStatus(true);
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
              >
                <MaterialCommunityIcons
                  color={colors.titlePrimary}
                  name="menu-swap"
                  size={20}
                />
                {CreateDatePickerDate()}
              </TouchableOpacity>
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

          <View>
            <View style={{ width: "100%" }}>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <View style={{ width: "40%", maxWidth: "45%" }}>
                  <ReportCards
                    title="مطالعه‌پیوسته"
                    time={ConvertNumberToTime({
                      number: pickedReport.mostContinuesStudyTime,
                    })}
                    icon="finance"
                    color={colors.background}
                  />
                </View>

                <ReportCards
                  title="مطالعه"
                  time={ConvertNumberToTime({
                    number: pickedReport.studyTime,
                  })}
                  icon="book-open-page-variant"
                />
              </View>
              <View style={{ flexDirection: "row", width: "100%" }}>
                <ReportCards
                  title="آموزش مجازی"
                  icon="cast-education"
                  color={colors.background}
                  time={ConvertNumberToTime({
                    number: pickedReport.timeUsedTotorials,
                  })}
                />
                <View style={{ width: "40%" }}>
                  <ReportCards
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
                  <MainTexts.MainTitleTexts title="تعداد تست" />
                  <MainTexts.MainTitleTexts
                    title={pickedReport.numberOfTests ?? "0"}
                  />
                </View>
              </View>

              <ExamRenderer
                list={exams.filter((e) => {
                  if (e.report.id === pickedReport.id) return true;
                  else return false;
                })}
              />
            </View>
          </View>

          <ExplainRenderer
            list={explains.filter((e) => {
              if (e.report.id === pickedReport.id) return true;
              else return false;
            })}
          />
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
              setSettingModalStatus(true);
            }}
            name="cog-outline"
          />
        </View>

        {userDetails.role === 2 ? (
          <View
            style={{
              position: "absolute",
              right: 16,
              bottom: 16,
            }}
          >
            <MainIconButton
              onPress={() => {
                setMessageModalStatus(true);
              }}
              iconSize={40}
              name="message-text"
            />
          </View>
        ) : (
          <></>
        )}
      </>
    );
  };

  if (!(penaltyloaded && examloaded && reportloaded && explainloaded)) {
    return (
      <MainScreen>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("./../assets/smallloading.gif")} />
        </View>
      </MainScreen>
    );
  }

  return (
    <MainScreen>
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={false}
            onRefresh={() => {
              console.log("dsad");

              reload();
            }}
          />
        }
        style={{ flex: 1 }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            style={{ height: 30, marginBottom: 8 }}
            resizeMode="contain"
            source={require("./../assets/bannertp.png")}
          />
        </View>
        <View>
          <View
            style={{
              padding: 4,
            }}
          >
            {CreateReports()}
          </View>

          {CreateChart()}

          {CreatePenaltyRenderer()}
        </View>

        <View style={{ height: 100 }}></View>
      </ScrollView>
      {CreateBottomIconButtons()}

      {CreateMessageModal()}

      {CreateSettingModal()}
    </MainScreen>
  );
};

export default HomeScreen;
