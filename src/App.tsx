import { useState } from "react";
import { Calculator } from "./Calculator";
import Stakers from "./Stakers";
import LineAndBarGraph from "./LineAndBarChart";
import TotalADAStaked from "./TotalADAStaked";

function App() {
  const [rewards, setRewards] = useState(0);
  const [animationEffect, setAnimationEffect] = useState(false);

  const handleAnimation = () => {
    if (animationEffect === true) {
      return setAnimationEffect(false);
    }
  };

  return (
    <div className="gradient-bg min-w-screen min-h-screen">
      <header className="relative">
        <div className="min-w-screen h-8 bg-white"></div>
        <img
          className="min-w-screen rotate-180 overflow-hidden"
          src={require("./images/clouds.png")}
          alt="clouds header"
        />
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://anetabtc.io/"
        >
          <img
            className="absolute top-0 w-48 p-3"
            src={require("./images/anetaBTC_logo_text_black.png")}
            alt="anetaBTC logo"
          />
        </a>
      </header>

      <div className="flex justify-center pt-16 pb-40">
        <img
          className={`${animationEffect && "animate-bounce"} w-3/12`}
          src={require("./images/anetaBTC_angel1.png")}
          alt="anetaBTC angel logo"
        />

        <div
          className="mx-10 my-auto flex flex-col text-left"
          // onAnimationEnd={handleAnimation}
        >
          <span className="pt-6 text-6xl font-bold text-anetaCyan">
            LISO Rewards Calculator
          </span>
          <span className="py-2 text-2xl">
            How much cNETA can you earn from staking your ADA with anetaBTC?
          </span>
          <Calculator
            setRewards={setRewards}
            setAnimationEffect={setAnimationEffect}
            onAnimationEnd={handleAnimation}
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
      </div>

      <div>{Boolean(rewards) && <LineAndBarGraph rewards={rewards} />}</div>

      <div className="m-auto mt-24 mb-20 flex w-10/12">
        <TotalADAStaked />
        <Stakers />
      </div>

      <footer className="relative">
        <img
          className="min-w-screen overflow-hidden"
          src={require("./images/clouds.png")}
          alt="anetaBTC logo"
        />
        <div className="min-w-screen flex h-24 justify-between bg-white">
          <div className="ml-2">
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://anetabtc.io/"
            >
              <img
                className="absolute bottom-24 w-40 p-1"
                src={require("./images/anetaBTC_logo_text_black.png")}
                alt="anetaBTC logo"
              />
            </a>
            <div className="ml-2 w-96 px-2">
              anetaBTC is a decentralized, secure protocol that allows users to
              unlock the value of their Bitcoin on Ergo and Cardano.
            </div>
          </div>
          <div className="justify-self-end px-5">
            <div className="mb-2 flex">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://discord.gg/anetabtc"
              >
                <img
                  className="ml-7 h-10 w-10"
                  src={require("./images/discord.png")}
                  alt="discord logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://twitter.com/anetaBTC"
              >
                <img
                  className="ml-7 h-10 w-10"
                  src={require("./images/twitter.png")}
                  alt="twitter logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://medium.com/@anetaBTC"
              >
                <img
                  className="ml-7 h-10 w-10"
                  src={require("./images/medium.png")}
                  alt="medium logo"
                />
              </a>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://t.me/anetaBTC"
              >
                <img
                  className="ml-7 h-10 w-10"
                  src={require("./images/telegram.png")}
                  alt="telegram logo"
                />
              </a>
            </div>
            <span className="px-2">anetaBTC is a Singapore based DAO</span>
          </div>
        </div>
      </footer>
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