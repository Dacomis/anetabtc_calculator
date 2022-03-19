import { useState } from "react";
import { Calculator } from "./Calculator";
import LineAndBarGraph from "./LineAndBarChart";

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
    </div>
  );
}

export default App;
