import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { colors } from "../configs";
import MainTexts from "./MainTexts";

const ExamRenderer = ({ list = [] }) => {
  if (list.length === 0) return <View></View>;

  return (
    <View
      style={{
        margin: 8,
        padding: 8,
        borderColor: colors.darkgrayiconsitems,
        borderRadius: 16,
        borderWidth: 2,
      }}
    >
      <View
        style={{
          paddingHorizontal: 32,
          flex: 1,
        }}
      >
        <View
          style={{
            alignItems: "center",
          }}
        >
          <MainTexts.MainTitleTexts title="آزمون‌ها" />
        </View>

        <View
          style={{
            flexDirection: "row-reverse",
            marginBottom: 4,
          }}
        >
          <View style={{ flex: 3 }}>
            <MainTexts.MainContextSubTexts title="آزمون" />
          </View>
          <View
            style={{
              flex: 1,
              backgroundColor: "",
              alignItems: "center",
            }}
          >
            <MainTexts.MainContextSubTexts title="درصد" />
          </View>
          <View
            style={{
              flex: 1,
              alignItems: "flex-start",
            }}
          >
            <MainTexts.MainContextSubTexts title="رتبه" />
          </View>
        </View>

        {list.map((l) => (
          <ExamCard
            key={l.id}
            title={l.name}
            rank={l.rank}
            percent={l.percent}
          />
        ))}
      </View>
    </View>
  );
};

const ExamCard = ({ title, rank, percent }) => {
  return (
    <View
      style={{
        flexDirection: "row-reverse",
        borderTopWidth: 0.5,
        borderColor: colors.titlePrimary,
        paddingVertical: 4,
        alignItems: "center",
      }}
    >
      <View style={{ flex: 3 }}>
        <MainTexts.MainContextSubTexts title={title} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <MainTexts.MainSecondTitleTexts title={percent} />
      </View>
      <View
        style={{
          flex: 1,
          alignItems: "flex-start",
        }}
      >
        <MainTexts.MainSecondTitleTexts title={rank} />
      </View>
    </View>
  );
};

export default ExamRenderer;
