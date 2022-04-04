import React, { useState } from "react";
import { SearchIcon } from "./images/SearchIcon";
import { CalculatorType } from "./interfaces/interfaces";
import { isNumber, isStakingAddress } from "./utils/Utils";

type Props = {
  setRewards?: any;
  setStakingAddress?: any;
  setAnimationEffect?: any;
  onAnimationEnd?: any;
  placeholder: string;
  calculatorType: CalculatorType;
};

export const Calculator = ({
  setRewards,
  setStakingAddress,
  setAnimationEffect,
  onAnimationEnd,
  placeholder,
  calculatorType,
}: Props) => {
  const [input, setInput] = useState("");

  const handleSubmit = (evt: React.SyntheticEvent) => {
    evt.preventDefault();
    calculatorType === CalculatorType.StakedADA
      ? setRewards(Number(input))
      : setStakingAddress(input);
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
        value={input}
        placeholder={placeholder}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="ml-5 w-28 rounded-lg border-indigo-300 bg-teal-900 p-2 text-xl  shadow-2xl disabled:opacity-50"
        disabled={
          calculatorType === CalculatorType.StakedADA
            ? !isNumber(input)
            : isStakingAddress(input)
        }
        type="submit"
        // onClick={() => {
        //   console.log("animation start");
        //   setAnimationEffect(true);
        // }}
        // onAnimationEnd={() => {
        //   console.log("animation end");
        //   onAnimationEnd();
        // }}
      >
        Calculate
      </button>
    </form>
  );
};
