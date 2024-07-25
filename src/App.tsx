import SwapComponent from "./SwapComponent";
import TransactionsComponent from "./TransactionComponent";
import Balances from "./Balances";
import { useGardenSetup } from "./store";
import "./App.css";
import { SpeedInsights } from "@vercel/speed-insights/react";

function App() {
  useGardenSetup();
  return (
    <div id="container">
      <Balances />
      <SwapComponent />
      <TransactionsComponent />
      <SpeedInsights /> {/* Add this component here */}
    </div>
  );
}

export default App;
