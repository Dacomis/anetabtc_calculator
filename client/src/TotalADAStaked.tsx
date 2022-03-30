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
    // TODO: Loading graph
    return <div>Loading...</div>;
  } else {
    return (
      <div className="relative mr-5 flex min-w-[49%] flex-col">
        <div className="absolute top-0 z-10 ml-64 flex flex-col rounded-lg border-cardanoBlue bg-cardanoBlue bg-opacity-50 p-2 px-5 text-center text-2xl font-semibold text-gray-100 text-opacity-70">
          <span>Current ADA Staked</span>
          <span className="text-3xl text-gray-200 text-opacity-80">
            {ADAWithCommas(getActiveStake(history).slice(-1)[0])} ₳
          </span>
        </div>
        <ReactECharts
          className="m-auto my-8 rounded-lg bg-blue-300 bg-opacity-40 shadow-2xl"
          option={option}
          style={{ height: "350%", width: "100%" }}
        />
      </div>
    );
  }
};

export default TotalADAStaked;
