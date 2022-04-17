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
      <div className="mx-auto flex h-80 w-10/12 flex-col justify-center rounded-lg bg-anetaGold bg-opacity-50 text-center text-3xl text-gray-200 shadow-2xl md:min-w-[80%] lg:w-5/12 lg:min-w-[40%]">
        Retrieving data ...
      </div>
    );
  } else {
    return (
      <div className="relative mx-auto flex min-w-[90%] flex-col md:min-w-[80%] lg:min-w-[40%]">
        <div className="absolute top-9 left-1/2 z-10 mx-auto flex -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg border-anetaGold bg-anetaGold bg-opacity-50 p-2 px-5 text-center text-sm font-semibold text-gray-100 md:text-base lg:text-xl">
          <span>anetaBTC Delegators</span>
          {typeof history !== "undefined" && history.length ? (
            <span className="text-base text-gray-100 md:text-lg lg:text-2xl">
              {getDelegators(history).slice(-1)[0] &&
                numberWithCommas(getDelegators(history).slice(-1)[0])}
            </span>
          ) : (
            <span>Could not be retrieved</span>
          )}
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
