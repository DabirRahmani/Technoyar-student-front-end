import React, { useState } from "react";
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

export default function App() {
  const sstack = createStackNavigator();

  return (
    <NavigationContainer>
      <sstack.Navigator screenOptions={{ headerMode: "none" }}>
        <sstack.Screen name="login" component={LoginScreen} />
        <sstack.Screen name="home" component={HomeScreen} />
      </sstack.Navigator>
    </NavigationContainer>
  );
}
