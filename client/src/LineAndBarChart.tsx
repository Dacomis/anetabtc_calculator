import ReactECharts from "echarts-for-react";
import { constructEpochs } from "./utils/Utils";

//TODO
// type Props = {
//   rewards: {
//     [active_epoch: number]: number;
//   };
//   currentEpoch: number;
// };

const LineAndBarGraph = ({
  rewards,
  rewardsPerEpoch,
  epochs,
}: any): JSX.Element => {
  const option = {
    tooltip: {
      trigger: "axis",
      confine: true,
      axisPointer: {
        type: "cross",
        crossStyle: {
          color: "#999",
        },
      },
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
        data: constructEpochs(epochs), //TODO - redo constructEpochs
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
          // Leave it like this, weird behavior of echarts
          formatter: `{value}
          cNETA`,
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
          // Leave it like this, weird behavior of echarts
          formatter: `{value} cNETA
    /Epoch`,
        },
        axisLine: { lineStyle: { color: "#333" } },
        splitLine: { lineStyle: { color: "#8cc383" } },
      },
    ],
    dataZoom: [
      {
        type: "slider",
        show: true,
        start: 70,
        end: 100,
        handleSize: 8,
      },
      {
        type: "inside",
        start: 70,
        end: 100,
      },
    ],
    grid: {
      top: "18%",
      left: "0%",
      right: "1%",
      bottom: "12%",

      containLabel: true,
    },
    series: [
      {
        name: "Total Rewards",
        type: "bar",
        tooltip: {
          valueFormatter: function (value: number) {
            return value + " cNETA";
          },
        },
        data: rewards,
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
        data: rewardsPerEpoch,
      },
    ],
  };

  return (
    <ReactECharts
      className="m-auto mb-8 mt-6 rounded-lg bg-anetaCyan bg-opacity-50 shadow-2xl"
      option={option}
      style={{ height: "650%", width: "90%" }}
    />
  );
};

export default LineAndBarGraph;
