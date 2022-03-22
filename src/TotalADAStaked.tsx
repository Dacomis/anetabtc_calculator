import ReactECharts from "echarts-for-react";
import { numberWithCommas } from "./Utils";

const totalADAStacked = 54707271; // get dynamic from anetaBTC API

// add data from anetaBTC API
const TotalADAStaked = (): JSX.Element => {
  const option = {
    title: {
      textStyle: {
        fontSize: 20,
        height: 1000,
      },
      //   textAlign: "right",
      padding: [0, 0, 20, 180],
      margin: 20,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        crossStyle: {
          color: "#1E3A8A",
        },
      },
      backgroundColor: "#0033ADCC",
      borderColor: "#0033ADE6",
      //   position: ["50%", "50%"],
      textStyle: {
        color: "#EFF6FF",
      },
      formatter: `<div style='text-align: center; display: flex; flex-direction: column'>
            <span> {c} ₳ </span>
            <span style='color:#94A3B8; font-size:90%;'> {b} </span>
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
      interval: 20000000,
      position: "right",
      axisLabel: {
        formatter: function (value: string) {
          return Number(value) > 0
            ? `${value.toString().slice(0, 2)} M`
            : value;
        },
      },
    },
    series: [
      {
        data: [
          9707271,
          14707271,
          20707271,
          34707271,
          39707271,
          49707271,
          54707271, // get dynamic from anetaBTC API
        ],
        type: "line",
        areaStyle: {},
        itemStyle: {
          color: "#0033AD99",
        },
      },
    ],
  };

  return (
    <div className="relative mr-5 flex min-w-[49%] flex-col">
      <div className="absolute top-0 z-10 ml-64 flex flex-col rounded-lg border-cardanoBlue bg-cardanoBlue bg-opacity-50 p-2 px-5 text-center text-2xl font-semibold text-gray-100 text-opacity-70">
        <span>Current ₳ Stacked</span>
        <span className="text-3xl text-gray-200 text-opacity-80">
          {numberWithCommas(totalADAStacked)} ₳
        </span>
      </div>
      <ReactECharts
        className="m-auto my-8 rounded-lg bg-blue-300 bg-opacity-40 shadow-2xl"
        option={option}
        style={{ height: "350%", width: "100%" }}
      />
    </div>
  );
};

export default TotalADAStaked;
