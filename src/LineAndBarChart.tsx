import ReactECharts from "echarts-for-react";
import { epochsEnum } from "./Utils.js";
import { yAxisOptions } from "./Utils.js";

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
  epochs.map((epochs, index) => {
    if (index === 12) {
      console.log("este");
      return rewards.push(0.506);
    } else {
      console.log("nu");
      return rewards.push(0.006);
    }
  });
  console.log(rewards);

  return rewards;
};

//make this functional with Ramda
const configYAxis = (
  stakedADA: number,
  yAxisOptions: { max: number; interval: number }
): {
  max: number;
  interval: number;
} => {
  switch (stakedADA.toString().length) {
    case 2:
      yAxisOptions = { max: 60, interval: 5 };
      break;
    case 3:
      yAxisOptions = { max: 600, interval: 50 };
      break;
    case 4:
      yAxisOptions = { max: 6000, interval: 500 };
      break;
    case 5:
      yAxisOptions = { max: 60000, interval: 5000 };
      break;
    case 6:
      yAxisOptions = { max: 600000, interval: 50000 };
      break;
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
      style={{ height: "650%", width: "79%" }}
    />
  );
};

export default LineAndBarGraph;
