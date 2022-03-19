import ReactECharts from "echarts-for-react";
import { epochsEnum } from "./Utils.jsx";
import { yAxisOptions } from "./Utils.jsx";

const epochs = epochsEnum;

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
  const rewards = [];
  rewards.push(epochs.map((epochs, index) => (index < 12 ? 0.006 : 0.506)));
  return rewards[0];
};

const configYAxis = (
  stakedADA: number,
  yAxisOptions: { max: number; interval: number }
): {
  max: number;
  interval: number;
} => {
  switch (stakedADA.toString().length) {
    case 2:
      yAxisOptions = { max: 110, interval: 5 };
      break;
    case 3:
      yAxisOptions = { max: 1090, interval: 50 };
      break;
    case 4:
      yAxisOptions = { max: 10900, interval: 500 };
      break;
    case 5:
      yAxisOptions = { max: 109000, interval: 5000 };
      break;
    case 6:
      yAxisOptions = { max: 1090000, interval: 50000 };
      break;
    default:
      yAxisOptions = { max: 110, interval: 5 };
  }

  return yAxisOptions;
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
    },
    xAxis: [
      {
        type: "category",
        data: epochs,
        axisPointer: {
          type: "shadow",
        },
      },
    ],
    yAxis: [
      {
        type: "value",
        name: "Total Rewards",
        min: 0,
        max: configYAxis(rewards, yAxisOptions).max, //make this dynamic on input
        interval: configYAxis(rewards, yAxisOptions).interval, //make this dynamic on input
        axisLabel: {
          formatter: "{value} cNETA",
        },
      },
      {
        type: "value",
        name: "Rewards/Epoch",
        min: 0,
        max: configYAxis(rewards, yAxisOptions).max, //make this dynamic on input
        interval: configYAxis(rewards, yAxisOptions).interval, //make this dynamic on input
        axisLabel: {
          formatter: "{value} cNETA/Epoch",
        },
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
      style={{ height: "650%", width: "90%" }}
    />
  );
};

export default LineAndBarGraph;
