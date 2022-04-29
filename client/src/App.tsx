import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Stakers from "./Delegators";
import TotalADAStaked from "./TotalADAStaked";
import { Footer } from "./Footer";
import { Header } from "./Header";
import ManualCalculationForm from "./ManualCalculationForm";
import { getPort } from "./utils/Utils";
import LISOI from "./LISOIRewards";
import LISOII from "./LISOIIRewards";
import { ILISOIIRewards, ILISOIRewards } from "./interfaces/interfaces";
import NumberFormat from "react-number-format";
import StakingAddressForm from "./StakingAddressForm";

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
  const [manuallyCalculate, setManuallyCalculate] = useState(true);

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
      <Helmet>
        <meta charSet="utf-8" />
        <title>LISO Calculator anetaBTC</title>
        <link
          rel="canonical"
          href="https://anetabtc-liso-calculator.herokuapp.com/"
        />
        <meta name="description" content="LISO Calculator anetaBTC" />
      </Helmet>
      <Header />
      <div className="mx-auto flex flex-col justify-center py-6">
        <div className="mx-2 flex flex-col py-10 md:mx-auto md:w-11/12 md:flex-row lg:w-9/12">
          <img
            className="mx-auto w-8/12 md:mx-0 lg:w-4/12"
            src={require("./images/anetaBTC_angel1.png")}
            alt="anetaBTC angel logo"
          />
          <div className="my-auto mx-auto w-10/12 md:mx-0 xl:w-8/12">
            <div className="flex flex-col items-center text-3xl font-bold text-anetaCyan md:items-center md:text-center md:text-6xl lg:text-6xl">
              <img
                className="mx-auto md:mx-0 lg:w-9/12"
                src={require("./images/aneta_LISO_transparent.png")}
                alt="anetaBTC angel logo"
              />
              <span>Rewards Calculator</span>
            </div>
            <div className="mx-auto mt-2 w-10/12 text-center text-lg md:text-3xl">
              An overview of your cNETA rewards
            </div>
          </div>
        </div>

        <div className="mx-auto flex w-10/12 flex-col rounded-lg border-cyan-100 bg-cyan-50 p-4 text-center shadow-lg shadow-cyan-50/50 md:mt-10 lg:w-6/12">
          <span className="text-lg text-anetaCyan">
            How would you like to calculate your rewards?
          </span>
          <div className="flex flex-col md:flex-row md:justify-around">
            <button
              className={`${
                manuallyCalculate
                  ? "border-anetaGold bg-anetaGold text-opacity-100 opacity-100"
                  : "border-anetaGold/50 bg-transparent text-opacity-80 opacity-70"
              } m-2 rounded-lg border-2 border-anetaGold p-1 text-anetaCyan shadow-lg md:w-72`}
              onClick={(e) => setManuallyCalculate(true)}
            >
              Manually Calculate
            </button>
            <button
              className={`${
                !manuallyCalculate
                  ? "border-anetaGold bg-anetaGold text-opacity-100 opacity-100"
                  : "border-anetaGold/50 bg-transparent text-opacity-80 opacity-70"
              } m-2 rounded-lg border-2 p-1 text-anetaCyan shadow-lg md:w-72`}
              onClick={(e) => setManuallyCalculate(false)}
            >
              {/* TODO Talk with Max about text and color of text when disabled */}
              Use My Staking Address
            </button>
          </div>
        </div>

        <div
          className={`${
            !manuallyCalculate ? "visible" : "hidden"
          } mx-auto flex w-10/12 flex-col rounded-lg p-4 text-center lg:w-6/12`}
        >
          <span className="mb-2 text-lg">
            <strong>Disclaimer:</strong>
          </span>
          <span>
            When using the “Use My Stake Address” method, rewards are calculated
            based on your active stake from <strong>epoch #1</strong> for{" "}
            <strong>LISO I</strong> and based on your active stake from your{" "}
            <strong>13th epoch</strong> for <strong>LISO II</strong>. Results
            are therefore an estimate of the rewards you will receive and may
            not be an exact representation of the cNETA rewards you will
            receive.
          </span>
        </div>

        <div
          className={`${
            manuallyCalculate ? "visible" : "hidden"
          } mx-auto mt-6 w-10/12 justify-center md:flex-row lg:justify-evenly`}
        >
          <div className="mx-auto rounded-lg border-cyan-100 bg-cyan-50 p-4 shadow-lg shadow-cyan-50/50 md:w-9/12 lg:w-5/12">
            <ManualCalculationForm
              currentEpoch={currentEpoch}
              setLISOIRewards={setLISOIRewards}
              setLISOIIRewards={setLISOIIRewards}
            />
          </div>
        </div>

        <div
          className={`${
            !manuallyCalculate ? "visible" : "hidden"
          } mx-auto mt-6 w-10/12 justify-center md:flex-row lg:justify-evenly`}
        >
          <div className="mx-auto rounded-lg border-cyan-100 bg-cyan-50 p-4 shadow-lg shadow-cyan-50/50 md:w-9/12 lg:w-5/12">
            <StakingAddressForm
              setLISOIRewards={setLISOIRewards}
              setLISOIIRewards={setLISOIIRewards}
            />
          </div>
        </div>
      </div>

      {LISOIRewards.LISOITotalRewards > 0 && (
        <div className="mx-auto mt-24 flex w-10/12 flex-col justify-center rounded-lg border-cyan-100 bg-cyan-50 p-4 shadow-lg shadow-cyan-50/50 md:w-9/12 md:flex-row lg:w-7/12 lg:justify-evenly xl:w-5/12">
          <LISOI LISOIRewards={LISOIRewards} />
        </div>
      )}

      {LISOIIRewards.stakingRewardsTotal > 0 && (
        <div className="mx-auto mt-28 flex w-10/12 flex-col justify-center rounded-lg border-cyan-100 bg-cyan-50 p-4 shadow-lg shadow-cyan-50/50 md:w-9/12 md:flex-row lg:w-7/12 lg:justify-evenly xl:w-5/12">
          <LISOII LISOIIRewards={LISOIIRewards} />
        </div>
      )}

      <div
        className={`${
          LISOIRewards.LISOITotalRewards > 0 ? "visible" : "hidden"
        } mx-auto mt-12 w-5/12 rounded-lg border-cardanoBlue bg-teal-50/75 bg-opacity-60 py-2 text-center text-sm shadow-3xl shadow-anetaGold md:mb-10 md:w-3/12 lg:w-2/12 xl:w-52`}
      >
        <div className="flex flex-col items-center text-xl font-semibold md:text-2xl">
          <img
            className="w-20 md:w-32"
            src={require("./images/anetaBTC_logo.png")}
            alt="anetaBTC logo"
          ></img>
          <div className="flex flex-col">
            <span className="text-anetaGold">
              {/* TODO Talk with Max about text color - in Figma is black */}
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