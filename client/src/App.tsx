import { useEffect, useState } from "react";
import Stakers from "./Delegators";
import LineAndBarGraph from "./LineAndBarChart";
import TotalADAStaked from "./TotalADAStaked";
import { Footer } from "./Footer";
import { Header } from "./Header";
import Form from "./Form";
import { getPort } from "./utils/Utils";
import LISOI from "./LISOIRewards";
import LISOII from "./LISOIIRewards";
import { ILISOIIRewards, ILISOIRewards } from "./interfaces/interfaces";
import NumberFormat from "react-number-format";

function App() {
  const [currentEpoch, setCurrentEpoch] = useState(0);
  const [LISOIRewards, setLISOIRewards] = useState<ILISOIRewards>({
    stakingRewards: 0,
    bonusRewards: 0,
    angelRewards: 0,
    lastEpochOfLISOI: 0,
    LISOITotalRewards: 0,
  });
  const [LISOIIRewards, setLISOIIRewards] = useState<ILISOIIRewards>({
    angelBoostedBaseRewards: 0,
    longTermRewards: 0,
    angelBoostedLongTermRewards: 0,
    stakingRewardsTotal: 0,
    lastEpochOfLISOII: 0,
  });

  // pools stake and delegators history
  const [historyError, setHistoryError] = useState(null);
  const [isHistoryLoaded, setIsHistoryLoaded] = useState(false);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetch(`${getPort()}/history`)
      .then((res) => res.json())
      .then(
        (result) => {
          setIsHistoryLoaded(true);
          setHistory(result);
          setCurrentEpoch(result.at(-1).epoch + 1);
        },
        (error) => {
          setIsHistoryLoaded(true);
          setHistoryError(historyError);
        }
      );
  }, []);

  return (
    <div className="gradient-bg min-w-screen min-h-screen">
      <Header />
      <div className="mx-auto flex flex-col justify-center py-6">
        <div className="mx-2 flex py-10 lg:justify-center">
          <img
            className={`w-11/12 lg:w-4/12`}
            src={require("./images/anetaBTC_angel1.png")}
            alt="anetaBTC angel logo"
          />
          <div className="my-auto w-10/12 lg:w-4/12">
            <div className="flex flex-col pt-6 text-left text-2xl font-bold text-anetaCyan md:text-6xl lg:text-8xl">
              <span>LISO</span>
              <span>Rewards Calculator</span>
            </div>
            <div className="my-2 w-10/12 text-sm md:w-10/12 md:text-3xl">
              An overview of your cNETA rewards
            </div>
          </div>
        </div>

        <div className="mx-auto mt-14 flex w-10/12 flex-col justify-center md:flex-row lg:justify-evenly">
          <div className="rounded-lg border-cyan-100 bg-cyan-50 p-4 shadow-lg shadow-cyan-50/50 lg:w-5/12">
            <Form
              currentEpoch={currentEpoch}
              setLISOIRewards={setLISOIRewards}
              setLISOIIRewards={setLISOIIRewards}
            />
          </div>

          <div
            className={`${
              LISOIRewards.LISOITotalRewards > 0 ? "visible" : "hidden"
            } mx-auto mt-10 w-5/12 rounded-lg border-cardanoBlue bg-anetaCyan bg-opacity-60 py-2 text-center text-sm shadow-2xl shadow-anetaGold md:mb-10 md:w-3/12 md:self-center lg:mx-10 lg:w-2/12`}
          >
            <div className="flex flex-col items-center text-xl font-semibold md:text-2xl">
              <img
                className="w-20 md:w-32"
                src={require("./images/anetaBTC_logo.png")}
                alt="anetaBTC logo"
              ></img>
              <div className="flex flex-col">
                <span className="text-anetaGold">
                  <NumberFormat
                    decimalScale={2}
                    thousandSeparator
                    value={
                      LISOIRewards.LISOITotalRewards +
                      LISOIIRewards.stakingRewardsTotal
                    }
                    displayType="text"
                  />
                </span>
              </div>
            </div>
            <div className="flex flex-col md:text-lg">
              <span className="font-normal">cNETA</span>
              <span className="font-light">at the end of</span>
              <span className="font-light">Epoch {currentEpoch + 35}</span>
            </div>
          </div>
        </div>
      </div>

      {LISOIRewards.LISOITotalRewards > 0 && (
        <div className="mx-auto mt-24 flex w-10/12 flex-col justify-center rounded-lg border-cyan-100 bg-cyan-50 p-4 shadow-lg shadow-cyan-50/50 md:flex-row lg:w-7/12 lg:justify-evenly">
          <LISOI LISOIRewards={LISOIRewards} />
        </div>
      )}

      {LISOIIRewards.stakingRewardsTotal > 0 && (
        <div className="mx-auto mt-28 flex w-10/12 flex-col justify-center rounded-lg border-cyan-100 bg-cyan-50 p-4 shadow-lg shadow-cyan-50/50 md:flex-row lg:w-7/12 lg:justify-evenly">
          <LISOII LISOIIRewards={LISOIIRewards} />
        </div>
      )}

      <div className="w-12/12 m-auto my-10 flex flex-col lg:flex-row">
        <TotalADAStaked
          historyError={historyError}
          isHistoryLoaded={isHistoryLoaded}
          history={history}
        />
        <Stakers
          historyError={historyError}
          isHistoryLoaded={isHistoryLoaded}
          history={history}
        />
      </div>

      <Footer />
    </div>
  );
}

export default App;

// TODO: add jump effect on angel
// TODO: Manage staking delay on Cardano +2 epochs
// TODO: Message on staking address not found
// TODO: Instructions ans ? for form inputs