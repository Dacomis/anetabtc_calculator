import React, { useState } from "react";
import { SearchIcon } from "./images/SearchIcon";
import { isNumeric } from "./Utils";

//@ts-ignore
export const Calculator = ({ setRewards }) => {
  const [stakedADA, setStakedADA] = useState("");

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    setRewards(Number(stakedADA));
  };

  return (
    <div className="grid place-content-center text-gray-300">
      <span className="mx-10 my-16 flex flex-col text-center text-4xl font-bold text-anetaCyan">
        <div>
          <img
            className="m-auto w-4/12"
            src={require("./images/anetaBTC_logo_text_black.png")}
            alt="anetaBTC logo"
          />
        </div>
        <span className="mt-2">LISO Rewards Calculator</span>
      </span>

      <form
        onSubmit={handleSubmit}
        className="relative my-2 mx-auto flex w-9/12 justify-center rounded-lg border-cyan-100 bg-cyan-50 p-6 shadow shadow-cyan-50/50"
      >
        <div className="absolute bottom-9 left-9">
          <SearchIcon />
        </div>

        <input
          className="flex-grow overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 p-2 pl-11 text-lg text-cyan-900 shadow
                      shadow-cyan-100/50 placeholder:text-cyan-900/70 focus:border-cyan-100 focus:shadow-cyan-200 focus:outline-none"
          type="text"
          value={stakedADA}
          placeholder="Your Staked ADA"
          onChange={(e) => setStakedADA(e.target.value)}
        />
        <button
          className="ml-5 w-28 rounded-lg border-indigo-300 bg-teal-900 p-2 text-xl  shadow-2xl disabled:opacity-70"
          disabled={!isNumeric(stakedADA)}
          type="submit"
        >
          Calculate
        </button>
      </form>
    </div>
  );
};
