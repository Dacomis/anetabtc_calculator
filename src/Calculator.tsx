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
    <form
      onSubmit={handleSubmit}
      className="relative my-2 flex w-11/12 justify-center rounded-lg border-cyan-100 bg-cyan-50 p-4 text-gray-300 shadow shadow-cyan-50/50"
    >
      <div className="absolute bottom-7 left-7">
        <SearchIcon />
      </div>
      <input
        className="flex-grow overflow-clip truncate rounded-lg border border-cyan-50 bg-teal-100/75 p-1 pl-11 text-lg text-cyan-900 shadow
                      shadow-cyan-100/50 placeholder:text-cyan-900/70 focus:border-cyan-100 focus:shadow-cyan-800/80   focus:outline-none"
        type="text"
        value={stakedADA}
        placeholder="Your Staked ADA"
        onChange={(e) => setStakedADA(e.target.value)}
      />
      <button
        className="ml-5 w-28 rounded-lg border-indigo-300 bg-teal-900 p-2 text-xl  shadow-2xl disabled:opacity-50"
        disabled={!isNumeric(stakedADA)}
        type="submit"
      >
        Calculate
      </button>
    </form>
  );
};
