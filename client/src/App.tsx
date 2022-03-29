import { useEffect, useState } from "react";
import { Calculator } from "./Calculator";
import Stakers from "./Stakers";
import LineAndBarGraph from "./LineAndBarChart";
import TotalADAStaked from "./TotalADAStaked";
import { epochsEnum, rewardsPerEpoch, totalRewards } from "./Utils.js";
import { Footer } from "./Footer";
import { Header } from "./Header";

function App() {
  const [rewards, setRewards] = useState(0);
  const [animationEffect, setAnimationEffect] = useState(false);

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setData(data.message);
      });
  }, []);

  const handleAnimation = () => {
    if (animationEffect === true) {
      return setAnimationEffect(false);
    }
  };

  return (
    <div className="gradient-bg min-w-screen min-h-screen">
      <Header />

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
              <span className="text-anetaGold">
                {
                  totalRewards(rewards, rewardsPerEpoch(epochsEnum)).slice(
                    -1
                  )[0]
                }
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-light">cNETA</span>
            <span className="font-light">
              over {rewardsPerEpoch(epochsEnum).length - 1} epochs
            </span>
          </div>
        </div>
      </div>

      <div>
        {Boolean(rewards) && (
          <LineAndBarGraph
            totalRewards={totalRewards(rewards, rewardsPerEpoch(epochsEnum))}
            rewardsPerEpoch={rewardsPerEpoch(epochsEnum)}
          />
        )}
      </div>

      <div className="m-auto mt-24 mb-20 flex w-10/12">
        <TotalADAStaked />
        <Stakers />
      </div>

      <Footer />
    </div>
  );
}

export default App;

// TODO: add jump effect on angel
// TODO: check for epoch 318
// TODO: calendar
// TODO: API for Total ADA Staked and Number of Stakers
// TODO: API for Epochs
// TODO: Optimize for mobile
// TODO: Staking address
// TODO: Manage staking delay on Cardano +2 epochs
