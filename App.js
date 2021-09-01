import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import {
  Button,
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
  Alert,
  LogBox,
} from "react-native";
import {
  LargeMainButton,
  MeduimMainButton,
  SmallMainButton,
} from "./src/components/MainButtons";
import MainButton from "./src/components/MainButtons";
import { colors } from "./src/configs";
import MainScreen from "./src/screens/mainScreen";
import MainBox from "./src/components/MainBox";
import MainTitleTexts from "./src/components/MainTexts";
import MainTexts from "./src/components/MainTexts";
import strings from "./src/strings";
import LoginScreen from "./src/screens/loginScreen";
import HomeScreen from "./src/screens/homeScreen";
import { I18nManager } from "react-native";
import MessageScreen from "./src/screens/messageScreen";
import * as SecureStore from "expo-secure-store";
import RefreshRequest from "./src/backend/auth/refresh";

export default function App() {
  try {
    I18nManager.allowRTL(false);
  } catch (e) {}

  const sstack = createStackNavigator();

  const [isLogedIn, setIsLogedIn] = useState(false);

  const [waiting, setWaiting] = useState(true);

  const tokenGenerator = ({ err }) => {
    if (err) {
      setIsLogedIn(false);
      setWaiting(false);
    } else {
      setIsLogedIn(true);
      setWaiting(false);
    }
  };

  useEffect(() => {
    SecureStore.getItemAsync("token").then((e) => {
      if (e !== undefined && e !== null) {
        SecureStore.getItemAsync("refresh").then((e) => {
          if (e !== undefined && e !== null) {
            RefreshRequest({ calllerFunction: tokenGenerator });
          } else {
            setIsLogedIn(false);
            setWaiting(false);
          }
        });
      } else {
        setIsLogedIn(false);
        setWaiting(false);
      }
    });
  }, []);

  if (waiting)
    return (
      <MainScreen>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image source={require("./src/assets/smallloading.gif")} />
        </View>
      </MainScreen>
    );

  const CreateStacksScreen = () => {
    if (isLogedIn)
      return (
        <>
          <sstack.Screen name="home" component={HomeScreen} />
          <sstack.Screen name="login" component={LoginScreen} />
        </>
      );

    return (
      <>
        <sstack.Screen name="login" component={LoginScreen} />
        <sstack.Screen name="home" component={HomeScreen} />
      </>
    );
  };

  return (
    <NavigationContainer>
      <sstack.Navigator
        initialRouteName={isLogedIn ?? "home"}
        screenOptions={{ headerMode: "none" }}
      >
        {CreateStacksScreen()}
      </sstack.Navigator>
    </NavigationContainer>
  );
}
