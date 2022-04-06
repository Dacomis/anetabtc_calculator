import ReactECharts from "echarts-for-react";
import { getDelegators, getEpochs, numberWithCommas } from "./utils/Utils";

type Props = {
  historyError?: null | string;
  isHistoryLoaded: boolean;
  history: any;
};

const Delegators = ({
  historyError,
  isHistoryLoaded,
  history,
}: Props): JSX.Element => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        crossStyle: {
          color: "#1E3A8A",
        },
      },
      backgroundColor: "#ac733f99",
      borderColor: "#ac733f33",
      textStyle: {
        color: "#EFF6FF",
      },
      formatter: (
        params: any
      ) => `<div style='text-align: center; display: flex; flex-direction: column'>
                  <span> ${params[0].value} Delegators </span>
                  <span style='color:#E2E8F0; font-size:90%;'> Epoch ${params[0].name} </span>
            </div>`,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: getEpochs(history),
    },
    yAxis: {
      type: "value",
      position: "right",
      axisLabel: {
        formatter: function (value: string) {
          return Number(value) > 0
            ? `${value.toString().slice(0, 1)} k`
            : value;
        },
      },
    },
    series: [
      {
        name: "Tx Graph",
        data: getDelegators(history),
        type: "line",
        areaStyle: {},
        itemStyle: {
          color: "#f3c16f99",
        },
      },
    ],
  };

  if (historyError) {
    return <div>Error: {historyError}</div>;
  } else if (!isHistoryLoaded) {
    return (
      <div className="mx-2 flex h-80 w-10/12 flex-col justify-center rounded-lg bg-anetaGold bg-opacity-50 text-center text-3xl text-gray-200 shadow-2xl">
        Retrieving data ...
      </div>
    );
  } else {
    return (
      <div className="relative ml-5 flex min-w-[49%] flex-col">
        <div className="absolute top-0 z-10 ml-64 flex flex-col rounded-lg border-anetaGold bg-anetaGold bg-opacity-50 p-2 px-5 text-center text-2xl font-semibold text-gray-100">
          <span>anetaBTC Delegators</span>
          <span className="text-3xl text-gray-100">
            {getDelegators(history).slice(-1)[0] &&
              numberWithCommas(getDelegators(history).slice(-1)[0])}
          </span>
        </div>
        <ReactECharts
          className="m-auto my-8 rounded-lg bg-anetaGold bg-opacity-20 shadow-2xl"
          option={option}
          style={{ height: "350%", width: "100%" }}
        />
      </div>
    );
  }
};

export default Delegators;
