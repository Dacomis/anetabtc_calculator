import ReactECharts from "echarts-for-react";
import { epochsEnum } from "./Utils.js";

const epochs = epochsEnum;

//make this functional with Ramda
const totalRewards = (stakedADA: number, rewardsPerEpoch: any) => {
  let x = 0;
  let y: number[] = [];

  rewardsPerEpoch.map((rewards: any, index: any) => {
    x = x + stakedADA * rewards;
    return y.push(Number((Math.round(x * 100) / 100).toFixed(2)));
  });

  return y;
};

const rewardsPerEpoch = (epochs: string[]) => {
  const rewards: any[] = [];
  epochs.map((epochs, index) =>
    index === 12 ? rewards.push(0.506) : rewards.push(0.006)
  );
  return rewards;
};

type Props = {
  rewards: number;
};

const LineAndBarGraph = ({ rewards }: Props): JSX.Element => {
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
        data: epochs,
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

        data: totalRewards(rewards, rewardsPerEpoch(epochs)),
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
        data: rewardsPerEpoch(epochs),
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
