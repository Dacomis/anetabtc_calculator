import { useState } from "react";
import { Calculator } from "./Calculator";
import Stakers from "./Stakers";
import LineAndBarGraph from "./LineAndBarChart";
import TotalADAStaked from "./TotalADAStaked";

function App() {
  const [rewards, setRewards] = useState(0);

  // const handleSubmit = (evt: React.SyntheticEvent) => {
  //   evt.preventDefault();
  //   setRewards(Number(stakedADA) * 0.06);
  // };

  return (
    <div className="gradient-bg min-h-screen pb-10">
      <Calculator setRewards={setRewards} />
      {Boolean(rewards) && <LineAndBarGraph rewards={rewards} />}

      <div className="m-auto mt-16 flex w-10/12">
        <TotalADAStaked />
        <Stakers />
      </div>
    </div>
  );
}

export default App;
