import React from "react";
import { View, StyleSheet } from "react-native";
import RefreshRequest from "./auth/refresh";
import MainAxios from "./MainAxios";
import * as SecureStore from "expo-secure-store";

const AdminDetailsRequest = ({ datacaller, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  MainAxios()
    .get("/parent/get-admin", config)
    .then((e) => {
      datacaller(e.data);
    })
    .catch((e) => datacaller("error"));
  //درخواست چک کردن اینترنت
};

export default AdminDetailsRequest;
