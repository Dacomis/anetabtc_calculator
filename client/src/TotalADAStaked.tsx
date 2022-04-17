import ReactECharts from "echarts-for-react";
import { PoolsHistoryEpoch } from "./interfaces/interfaces";
import { getActiveStake, getEpochs, ADAWithCommas } from "./utils/Utils";

type Props = {
  historyError?: null | string;
  isHistoryLoaded: boolean;
  history: PoolsHistoryEpoch[];
};

const TotalADAStaked = ({
  historyError,
  isHistoryLoaded,
  history,
}: Props): JSX.Element => {
  const option = {
    title: {
      textStyle: {
        fontSize: 20,
        height: 1000,
      },
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
      textStyle: {
        color: "#EFF6FF",
      },
      formatter: (
        params: any
      ) => `<div style='text-align: center; display: flex; flex-direction: column'>
                  <span> ${ADAWithCommas(params[0].value)} ₳ </span>
                  <span style='color:#94A3B8; font-size:90%;'> Epoch ${
                    params[0].name
                  } </span>
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
            ? `${value.toString().slice(0, 2)} M`
            : value;
        },
      },
    },
    series: [
      {
        data: getActiveStake(history),
        type: "line",
        areaStyle: {},
        itemStyle: {
          color: "#0033AD99",
        },
      },
    ],
  };

  if (historyError) {
    // TODO: Error Boundaries https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/error_boundaries/
    return <div>Error: {historyError}</div>;
  } else if (!isHistoryLoaded) {
    return (
      <div className="mx-auto flex h-80 w-10/12 flex-col justify-center rounded-lg bg-cardanoBlue bg-opacity-50 text-center text-3xl text-gray-200 text-opacity-80 shadow-2xl md:min-w-[80%] lg:w-5/12 lg:min-w-[40%]">
        Retrieving data ...
      </div>
    );
  } else {
    return (
      <div className="relative mx-auto flex min-w-[90%] flex-col md:min-w-[80%] lg:min-w-[40%]">
        <div className="absolute top-9 left-1/2 z-10 mx-auto flex -translate-x-1/2 -translate-y-1/2 transform flex-col rounded-lg border-cardanoBlue bg-cardanoBlue bg-opacity-50 p-2 px-5 text-center text-sm font-semibold text-gray-100 text-opacity-70 md:text-base lg:text-xl">
          <span>Current ADA Staked</span>
          {typeof history !== "undefined" && history.length ? (
            <span className="text-base text-gray-200 text-opacity-80 md:text-lg lg:text-2xl">
              {ADAWithCommas(getActiveStake(history).slice(-1)[0])} ₳
            </span>
          ) : (
            <span>Could not be retrieved</span>
          )}
        </div>
        <ReactECharts
          className="m-auto my-8 mr-2 rounded-lg bg-blue-300 bg-opacity-40 shadow-2xl"
          option={option}
          style={{ height: "350%", width: "100%" }}
        />
      </div>
    );
  }
};

export default TotalADAStaked;
