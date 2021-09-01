import React, { useEffect, useState } from "react";
import { View } from "react-native";
import MainTexts from "./MainTexts";

const ExplainCards = ({ submited, title }) => {
  // اگر نیاز به تغییر فونت باشه
  // باید قابلیت تایید نشده رو به تکست های دیگه اضافه کرد اول
  return (
    <View style={{ marginTop: 8 }}>
      <MainTexts.MainContextSubTexts title={title} submited={submited} />
    </View>
  );
};

const ExplainRenderer = ({ list = [] }) => {
  var v = Object.values(list).sort((a, b) => {
    if (a.id > b.id) return -1;
  });

  if (list.length > 0)
    return (
      <View style={{ margin: 16 }}>
        <MainTexts.MainTitleTexts title="توضیحات:" />
        {v.map((l) => (
          <ExplainCards
            key={l.id + "explain"}
            title={l.additionalExplanation}
            submited={l.explanationViwed}
          />
        ))}
      </View>
    );

  return <View></View>;
};

export default ExplainRenderer;
