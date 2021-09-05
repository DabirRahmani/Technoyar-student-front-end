import React, { useState } from "react";
import {
  View,
  Modal,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import MainBox from "../components/MainBox";
import { LargeMainButton, MeduimMainButton } from "../components/MainButtons";
import MainTexts from "../components/MainTexts";
import { colors } from "../configs";
import MainScreen from "./mainScreen";
import * as SecureStore from "expo-secure-store";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ChangePasswordRequest from "../backend/changePass";
import MainSnack from "../components/MainSnack";

const SettingScreen = ({ visibalityStatus, changeStatus, user }) => {
  const [changePassStatus, setChangePassStatus] = useState(false);

  const [pass, setpass] = useState("");
  const [confirmpass, setconfrimpass] = useState("");
  const [oldpass, setoldpass] = useState("");

  const [passErr, setPassErr] = useState("");

  const [passSnackStatus, setPassSnackStatus] = useState(false);

  const [passchanged, setPassChanged] = useState(false);

  const ChangePassWord = () => {
    if (pass !== confirmpass) {
      setPassErr("رمزهای عبور مطابقت ندارند");
      setPassSnackStatus(true);
    } else if (pass.length < 8) {
      setPassErr("رمز عبور باید حداقل دارای 8 کاراکتر باشد");
      setPassSnackStatus(true);
    } else {
      ChangePasswordRequest({
        datacaller: ChangePassWordCaller,
        oldpass: oldpass,
        newpass: pass,
      });
    }
  };

  const ChangePassWordCaller = (data) => {
    console.log(data);
    if (data !== "error") {
      if (!data.err) {
        // data.code = 200
        if (data.code === 200) {
          setpass("");
          setoldpass("");
          setconfrimpass("");
          setChangePassStatus(false);
          setPassErr("رمز عبور با موفقیت تغییر کرد");
          setPassChanged(true);
          setPassSnackStatus(true);
        }
      }
    } else {
      setPassErr("رمز وارد شده اشتباه است");
      setPassSnackStatus(true);
    }
  };

  const CreateSnack = () => {
    if (passchanged)
      return (
        <View style={{ width: "100%", height: 50, marginTop: 8 }}>
          <MainSnack
            status={passSnackStatus}
            success
            setter={setPassSnackStatus}
            title={passErr}
          />
        </View>
      );

    return (
      <View style={{ width: "100%", height: 50, marginTop: 8 }}>
        <MainSnack
          status={passSnackStatus}
          danger
          setter={setPassSnackStatus}
          title={passErr}
        />
      </View>
    );
  };

  const nnavigator = useNavigation();

  const CreateChangePassForm = () => {
    if (!changePassStatus) return <View></View>;

    return (
      <MainBox>
        <TextInput
          style={{
            backgroundColor: colors.lightLayerBackGround,
            flex: 1,
            color: colors.contextSecondery,
            paddingHorizontal: 8,
            borderRadius: 8,
            fontSize: 14,
            borderWidth: 1,
            borderColor: colors.contextSecondery,
            marginTop: 16,
            direction: "ltr",
          }}
          placeholder="رمز عبور قدیمی"
          placeholderTextColor={colors.contextSecondery}
          secureTextEntry
          textAlign="left"
          onChangeText={(text) => {
            setoldpass(text);
          }}
          value={oldpass}
        />

        <TextInput
          style={{
            backgroundColor: colors.lightLayerBackGround,
            flex: 1,
            color: colors.contextSecondery,
            paddingHorizontal: 8,
            borderRadius: 8,
            fontSize: 14,
            borderWidth: 1,
            borderColor: colors.contextSecondery,
            marginTop: 16,
            direction: "ltr",
          }}
          placeholder="رمز عبور جدید"
          placeholderTextColor={colors.contextSecondery}
          secureTextEntry
          textAlign="left"
          onChangeText={(text) => {
            setpass(text);
          }}
          value={pass}
        />

        <TextInput
          style={{
            backgroundColor: colors.lightLayerBackGround,
            flex: 1,
            color: colors.contextSecondery,
            paddingHorizontal: 8,
            borderRadius: 8,
            fontSize: 14,
            borderWidth: 1,
            borderColor: colors.contextSecondery,
            marginTop: 16,
            direction: "ltr",
          }}
          placeholder="تکرار رمز عبور جدید"
          placeholderTextColor={colors.contextSecondery}
          secureTextEntry
          textAlign="left"
          onChangeText={(text) => {
            setconfrimpass(text);
          }}
          value={confirmpass}
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            marginTop: 16,
            marginBottom: 8,
          }}
        >
          <MeduimMainButton
            title="  تغییر رمز عبور  "
            onPress={() => {
              ChangePassWord();
              //setPassSnackStatus(false);
            }}
          />
          <MeduimMainButton
            backgroundColor={colors.darkgrayiconsitems}
            title="  لغو تغییر  "
            onPress={() => {
              setChangePassStatus(false);
              setPassSnackStatus(false);
            }}
          />
        </View>
      </MainBox>
    );
  };

  const LogOut = () => {
    SecureStore.deleteItemAsync("refresh").then(() => {
      SecureStore.deleteItemAsync("token").then(() => {
        nnavigator.replace("login", { logout: true });
      });
    });
  };

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
          style={{
            position: "absolute",
            bottom: 16,
            left: 16,
          }}
        >
          <LargeMainButton
            title="  خروج از حساب کاربری  "
            backgroundColor={colors.danger}
            onPress={LogOut}
          />
        </View>

        <View
          style={{
            marginHorizontal: 16,
            marginTop: 8,
            marginBottom: 8,
          }}
        >
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => {
              changeStatus(false);
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

        <ScrollView
          style={{
            paddingHorizontal: 16,
            marginBottom: 54,
          }}
        >
          <MainBox>
            <View style={{ alignItems: "center" }}>
              <MainTexts.MainTitleTexts title="پروفایل" />
            </View>
            <View style={{ marginHorizontal: 16 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <MainTexts.MainContextSubTexts title={user.username} />
                <MainTexts.MainContextSubTexts title="کد کاربری:" />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <MainTexts.MainContextSubTexts
                  title={
                    user.first_name !== "" || user.last_name !== ""
                      ? user.first_name + user.last_name
                      : "ثبت نشده"
                  }
                />
                <MainTexts.MainContextSubTexts title="نام:" />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 4,
                }}
              >
                <MainTexts.MainContextSubTexts
                  title={
                    user.phoneNumber !== "" && user.phoneNumber !== null
                      ? user.phoneNumber
                      : "ثبت نشده"
                  }
                />
                <MainTexts.MainContextSubTexts title="شماره تماس:" />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 4,
                }}
              >
                <MainTexts.MainContextSubTexts
                  title={
                    user.lastDiactivated !== null && +user.lastDiactivated > 15
                      ? "غیر فعال"
                      : "فعال"
                  }
                />
                <MainTexts.MainContextSubTexts title="وضعیت:" />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingTop: 4,
                }}
              >
                <MeduimMainButton
                  onPress={() => {
                    setChangePassStatus(true);
                  }}
                  disable={changePassStatus}
                  title="  تغییر رمز  "
                />
                <MainTexts.MainContextSubTexts title="رمز عبور:" />
              </View>
            </View>
          </MainBox>

          <View style={{ height: 16 }}></View>

          {CreateChangePassForm()}

          {CreateSnack()}
        </ScrollView>
      </MainScreen>
    </Modal>
  );
};

export default SettingScreen;
