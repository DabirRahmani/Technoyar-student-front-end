import React from "react";
import { View, StyleSheet } from "react-native";
import RefreshRequest from "./auth/refresh";
import MainAxios from "./MainAxios";

const ReportRequest = ({ datacaller }) => {
  const tokenGenerator = ({ token, err }) => {
    if (err) {
      datacaller({ err: true });
    } else {
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      MainAxios()
        .get("/mentors/reports", config)
        .then((e) => {
          datacaller(e.data);
        })
        .catch(() => datacaller("error"));
    }
  };
  RefreshRequest({ calllerFunction: tokenGenerator });
};

export default ReportRequest;
