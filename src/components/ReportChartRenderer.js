import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import MainBox from "./MainBox";
import MainTexts from "./MainTexts";
import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
} from "victory-native";
import { colors } from "../configs";

const data = [
  { date: "11", earnings: 4 },
  { date: "12", earnings: 5 },
  { date: "13", earnings: 1 },
  { date: "14", earnings: 0 },
  { date: "15", earnings: 2 },
  { date: "16", earnings: 4 },
  { date: "17", earnings: 6 },
  { date: "18", earnings: 7 },
  { date: "19", earnings: 9.75 },
];

const Bar = ({ height, secondHeight }) => {
  var v = height * 100;

  var vv = secondHeight * 100;

  return (
    <View
      style={{
        height: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <View
        style={{
          width: 5,
          height: v.toString() + "%",
          backgroundColor: colors.titlePrimary,
        }}
      ></View>

      <View
        style={{
          width: 5,
          marginLeft: 1,
          height: vv.toString() + "%",
          backgroundColor: colors.warning,
        }}
      ></View>
    </View>
  );
};

const ReportChartRenderer = ({ list = [] }) => {
  const [width, setWidth] = useState(0);

  var maxh = 0;

  const findMaxHeight = () => {
    for (var i = 0; i < list.length; i++) {
      if (+list[i].studyTime > maxh) maxh = +list[i].studyTime;
    }
  };

  findMaxHeight();

  if (maxh % 1 !== 0) maxh = maxh - (maxh % 1) + 1;

  var barArray = [];

  var maxhh = maxh - (maxh % 1) + 1;

  for (var i = 1; i < maxhh; i++) {
    barArray = [...barArray, { id: i }];
  }

  return (
    <MainBox>
      <View
        style={{
          flex: 1,
          flexDirection: "row-reverse",
        }}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
      >
        <View
          style={{
            borderLeftWidth: 1,
            borderColor: colors.darkgrayiconsitems,
            height: 200,
            flex: 1,
            borderBottomWidth: 1,
          }}
        >
          <View
            style={{
              flex: 1,
              flexDirection: "row-reverse",
              marginTop: 12,
            }}
          >
            {list.map((d) => (
              <Bar
                key={d.id}
                height={+d.studyTime / maxh}
                secondHeight={+d.sleepingTime / maxh}
              />
            ))}
          </View>
        </View>

        <View
          style={{
            width: 20,
            flexDirection: "column-reverse",
            paddingTop: 12,
          }}
        >
          {barArray.map((b) => (
            <View
              key={b.id}
              style={{
                flex: 1,
              }}
            >
              <View
                style={{
                  position: "absolute",
                  left: 20,
                  width: width - 20,
                  height: 1,
                  top: -1,
                  backgroundColor: colors.darkgrayiconsitems,
                  opacity: 0.2,
                }}
              ></View>
              <Text
                style={{
                  position: "absolute",
                  top: -12,
                  right: 5,
                  fontSize: 14,
                  color: colors.titlePrimary,
                }}
              >
                {b.id}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View
        style={{
          height: 20,
          flexDirection: "row-reverse",
        }}
      >
        {list.map((d) => {
          var day = d.day + "";

          day = day.toString().substring(day.length - 2, day.length);

          return (
            <View key={d.id} style={{ flex: 1, margin: 2 }}>
              <Text
                style={{
                  fontSize: 10,
                  color: colors.titlePrimary,
                  overflow: "visible",
                  flexWrap: "nowrap",
                  textAlign: "center",
                }}
              >
                {day}
              </Text>
            </View>
          );
        })}
        <View style={{ width: 20, height: 20 }}></View>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: "100%",
        }}
      >
        <View
          style={{
            justifyContent: "center",
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 30,
              height: 10,
              marginRight: 5,
              backgroundColor: colors.titlePrimary,
            }}
          ></View>
          <View>
            <MainTexts.MainSecoonderyContextSubTexts title="مطالعه" />
          </View>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View
            style={{
              width: 30,
              height: 10,
              backgroundColor: colors.warning,
              marginRight: 5,
            }}
          ></View>
          <View>
            <MainTexts.MainSecoonderyContextSubTexts title="استراحت" />
          </View>
        </View>
      </View>
    </MainBox>
  );
};

export default ReportChartRenderer;
