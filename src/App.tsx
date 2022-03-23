import { useState } from "react";
import { Calculator } from "./Calculator";
import Stakers from "./Stakers";
import LineAndBarGraph from "./LineAndBarChart";
import TotalADAStaked from "./TotalADAStaked";

function App() {
  const [rewards, setRewards] = useState(0);
  const [animationEffect, setAnimationEffect] = useState(false);

  return (
    <div className="gradient-bg min-w-screen min-h-screen pb-10">
      <img
        className="w-44 p-4"
        src={require("./images/anetaBTC_logo_text_black.png")}
        alt="anetaBTC Angel logo"
      />
      <header className="flex justify-center py-40">
        <img
          className={`${animationEffect && "animate-bounce"} w-3/12`}
          src={require("./images/anetaBTC_angel1.png")}
          alt="anetaBTC logo"
        />

        <div className="mx-10 my-auto flex flex-col text-left">
          <span className="pt-6 text-6xl font-bold text-anetaCyan">
            LISO Rewards Calculator
          </span>
          <span className="py-2 text-2xl">
            How much cNETA can you earn from staking your ADA with anetaBTC?
          </span>
          <Calculator
            setRewards={setRewards}
            setAnimationEffect={setAnimationEffect}
          />
        </div>

        <div
          className={`${
            Boolean(rewards) ? "visible" : "invisible"
          } my-auto h-1/2 rounded-lg border-cardanoBlue bg-anetaCyan bg-opacity-60 px-6 pt-2 pb-3 text-center text-lg shadow-2xl shadow-anetaGold`}
        >
          <div className="flex flex-col items-center text-2xl font-semibold">
            <img
              className="w-28"
              src={require("./images/anetaBTC_logo.png")}
              alt="anetaBTC logo"
            ></img>
            {/* <span className="text-lg font-light">You will receive</span> */}
            <div className="flex flex-col">
              <span>{6499} </span>
              <span>cNETA</span>
            </div>
          </div>
          <span className="font-light">over 24 epochs</span>
        </div>
      </header>

      <div>{Boolean(rewards) && <LineAndBarGraph rewards={rewards} />}</div>

      <div className="m-auto mt-24 flex w-10/12">
        <TotalADAStaked />
        <Stakers />
      </div>
    </div>
  );
}

export default App;


// TODO: add jump effect on angel
// TODO: footer
// TODO: check for epoch 318
// TODO: calendar
// TODO: API for Total ADA Staked and Number of Stakers
// TODO: API for Epochs
// TODO: Optimize for mobile