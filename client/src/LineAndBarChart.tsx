import ReactECharts from "echarts-for-react";
import { constructEpochs, rewardsPerEpoch, totalRewards } from "./utils/Utils";

type Props = {
  totalRewardsDict: {
    [active_epoch: number]: number;
  };
  currentEpoch: number;
};

const LineAndBarGraph = ({
  totalRewardsDict,
  currentEpoch,
}: Props): JSX.Element => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
    },
    toolbox: {
      feature: {
        magicType: { show: true, type: ["line", "bar"] },
        dataView: { show: true, readOnly: true },
        restore: { show: true },
        saveAsImage: { show: true },
      },
      bottom: "10",
      right: "35",
    },
    legend: {
      data: ["Total Rewards", "Rewards/Epoch"],
      top: "15",
      textStyle: {
        fontSize: 18,
      },
    },
    xAxis: [
      {
        type: "category",
        data: constructEpochs(totalRewardsDict),
        axisPointer: {
          type: "shadow",
        },
        axisLine: { lineStyle: { color: "#333" } },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Total Rewards",
        min: 0,
        max: undefined,
        interval: undefined,
        axisLabel: {
          formatter: "{value} cNETA",
        },
        axisLine: { lineStyle: { color: "#333" } },
        splitLine: { lineStyle: { color: "#6366F1" } },
      },
      {
        type: "value",
        name: "Rewards/Epoch",
        min: 0,
        max: undefined,
        interval: undefined,
        axisLabel: {
          formatter: "{value} cNETA/Epoch",
        },
        axisLine: { lineStyle: { color: "#333" } },
        splitLine: { lineStyle: { color: "#8cc383" } },
      },
    ],
    series: [
      {
        name: "Total Rewards",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: number) {
            return value + " cNETA";
          },
        },

        data: totalRewards(totalRewardsDict),
      },
      {
        name: "Rewards/Epoch",
        type: "line",
        yAxisIndex: 1,
        tooltip: {
          valueFormatter: function (value: number) {
            return value + " cNETA/Epoch";
          },
        },
        data: rewardsPerEpoch(totalRewardsDict),
      },
    ],
  };

  return (
    <ReactECharts
      className="m-auto my-8 mb-10 rounded-lg bg-anetaCyan bg-opacity-50 shadow-2xl"
      option={option}
      style={{ height: "650%", width: "79%" }}
    />
  );
};

export default LineAndBarGraph;
