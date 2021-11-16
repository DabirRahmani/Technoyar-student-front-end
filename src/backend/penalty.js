import React from "react";
import { View, StyleSheet } from "react-native";
import RefreshRequest from "./auth/refresh";
import MainAxios from "./MainAxios";

const PenaltyRequest = ({ datacaller, token }) => {
  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  MainAxios()
    .get("/mentors/get14penalties", config)
    .then((e) => {
      datacaller(e.data);
    })
    .catch(() => datacaller("error"));
  //درخواست چک کردن اینترنت
};

export default PenaltyRequest;
