import ReactECharts from "echarts-for-react";
import { numberWithCommas } from "./Utils";

const totalStakers = 27072; // get dynamic from anetaBTC API

// add data from anetaBTC API
const Stakers = (): JSX.Element => {
  const option = {
    // title: {
    //   text: `anetaBTC Stakers ${totalStakers}`,
    // },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        crossStyle: {
          color: "#1E3A8A",
        },
      },
      backgroundColor: "#ac733f99",
      borderColor: "#ac733f66",
      textStyle: {
        color: "#EFF6FF",
      },
      formatter: `<div style='text-align: center; display: flex; flex-direction: column'>
            <span> {c} Stakers </span>
            <span style='color:#E2E8F0; font-size:90%;'> {b} </span>
        </div>`,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: [
        "07.03.22", // get dynamic from anetaBTC API
        "14.03.22",
        "21.03.22",
        "28.02.22",
        "07.03.22",
        "14.03.22",
        "21.03.22",
      ],
    },
    yAxis: {
      type: "value",
      interval: 10000,
      position: "right",
      axisLabel: {
        formatter: function (value: string) {
          return Number(value) > 0
            ? `${value.toString().slice(0, 2)} k`
            : value;
        },
      },
    },
    series: [
      {
        name: "Tx Graph",
        // type: "graph",
        data: [
          1288,
          1927,
          2772,
          6470,
          9707,
          19707,
          27072, // get dynamic from anetaBTC API
        ],
        type: "line",
        areaStyle: {},
        itemStyle: {
          color: "#f3c16f99",
        },
      },
    ],
  };

  return (
    <div className="relative ml-5 flex min-w-[49%] flex-col">
      <div className="absolute top-0 z-10 ml-64 flex flex-col rounded-lg border-anetaGold bg-anetaGold bg-opacity-50 p-2 px-5 text-center text-2xl font-semibold text-gray-100">
        <span>anetaBTC Stakers</span>
        <span className="text-3xl text-gray-100">
          {numberWithCommas(totalStakers)}
        </span>
      </div>
      <ReactECharts
        className="m-auto my-8 rounded-lg bg-anetaGold bg-opacity-20 shadow-2xl"
        option={option}
        style={{ height: "350%", width: "100%" }}
      />
    </div>
  );
};

export default Stakers;
