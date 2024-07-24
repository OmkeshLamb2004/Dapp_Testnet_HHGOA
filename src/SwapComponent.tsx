import { useEffect, useState } from "react";
import { useMetaMaskStore, useGarden, useSignStore } from "./store";
import { Assets } from "@gardenfi/orderbook";



type AmountState = {
  btcAmount: string | null;
  wbtcAmount: string | null;
};

type SwapType = "WBTC_TO_BTC" | "BTC_TO_WBTC";

const SwapComponent: React.FC = () => {
  const [amount, setAmount] = useState<AmountState>({
    btcAmount: null,
    wbtcAmount: null,
  });

  const [swapType, setSwapType] = useState<SwapType>("WBTC_TO_BTC");
  const [swapStatus, setSwapStatus] = useState<string | null>(null); // State for swap status
  const [error, setError] = useState<string | null>(null); // State for error handling

  const changeAmount = (of: "WBTC" | "BTC", value: string) => {
    if (of === "WBTC") {
      handleWBTCChange(value);
    } else if (of === "BTC") {
      handleBTCChange(value);
    }
  };

  const handleWBTCChange = (value: string) => {
    const newAmount: AmountState = { wbtcAmount: value, btcAmount: null };
    if (Number(value) > 0) {
      const btcAmount = (1 - 0.3 / 100) * Number(value);
      newAmount.btcAmount = btcAmount.toFixed(8).toString();
    }
    setAmount(newAmount);
  };

  const handleBTCChange = (value: string) => {
    const newAmount: AmountState = { wbtcAmount: null, btcAmount: value };
    if (Number(value) > 0) {
      const wbtcAmount = (1 - 0.3 / 100) * Number(value);
      newAmount.wbtcAmount = wbtcAmount.toFixed(8).toString();
    }
    setAmount(newAmount);
  };

  const toggleSwapType = () => {
    setSwapType(swapType === "WBTC_TO_BTC" ? "BTC_TO_WBTC" : "WBTC_TO_BTC");
  };

  return (
    <div className="swap-component">
      <WalletConnect />
      <hr />
      <SwapAmount amount={amount} changeAmount={changeAmount} swapType={swapType} />
      <hr />
      <Swap
        amount={amount}
        changeAmount={changeAmount}
        swapType={swapType}
        setSwapStatus={setSwapStatus} // Pass setSwapStatus to Swap
        setError={setError} // Pass setError to Swap
      />
      <button onClick={toggleSwapType}>
        Switch to {swapType === "WBTC_TO_BTC" ? "BTC to WBTC" : "WBTC to BTC"}
      </button>
      {swapStatus && <p>Swap Status: {swapStatus}</p>} {/* Display swap status */}
      {error && <p>Error: {error}</p>} {/* Display error if any */}
    </div>
  );
};

const WalletConnect: React.FC = () => {
  const { connectMetaMask, metaMaskIsConnected } = useMetaMaskStore();

  return (
    <div className="swap-component-top-section">
      <span className="swap-title">Swap</span>
      <MetaMaskButton
        isConnected={metaMaskIsConnected}
        onClick={connectMetaMask}
      />
    </div>
  );
};

type MetaMaskButtonProps = {
  isConnected: boolean;
  onClick: () => void;
};

const MetaMaskButton: React.FC<MetaMaskButtonProps> = ({
  isConnected,
  onClick,
}) => {
  const buttonClass = `connect-metamask button-${
    isConnected ? "black" : "white"
  }`;
  const buttonText = isConnected ? "Connected" : "Connect Metamask";

  return (
    <button className={buttonClass} onClick={onClick}>
      {buttonText}
    </button>
  );
};

type TransactionAmountComponentProps = {
  amount: AmountState;
  changeAmount: (of: "WBTC" | "BTC", value: string) => void;
  swapType: SwapType;
};

const SwapAmount: React.FC<TransactionAmountComponentProps> = ({
  amount,
  changeAmount,
  swapType,
}) => {
  const { wbtcAmount, btcAmount } = amount;

  return (
    <div className="swap-component-middle-section">
      {swapType === "WBTC_TO_BTC" ? (
        <>
          <InputField
            id="wbtc"
            label="Send WBTC"
            value={wbtcAmount}
            onChange={(value) => changeAmount("WBTC", value)}
          />
          <InputField id="btc" label="Receive BTC" value={btcAmount} readOnly />
        </>
      ) : (
        <>
          <InputField
            id="btc"
            label="Send BTC"
            value={btcAmount}
            onChange={(value) => changeAmount("BTC", value)}
          />
          <InputField id="wbtc" label="Receive WBTC" value={wbtcAmount} readOnly />
        </>
      )}
    </div>
  );
};

type InputFieldProps = {
  id: string;
  label: string;
  value: string | null;
  readOnly?: boolean;
  onChange?: (value: string) => void;
};

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  readOnly,
  onChange,
}) => (
  <div>
    <label htmlFor={id}>{label}</label>
    <div className="input-component">
      <input
        id={id}
        placeholder="0"
        value={value ? value : ""}
        type="number"
        readOnly={readOnly}
        onChange={(e) => onChange && onChange(e.target.value)}
      />
      <button>{id.toUpperCase()}</button>
    </div>
  </div>
);

type SwapAndAddressComponentProps = {
  amount: AmountState;
  changeAmount: (of: "WBTC" | "BTC", value: string) => void;
  swapType: SwapType;
  setSwapStatus: (status: string | null) => void; // Add setSwapStatus
  setError: (error: string | null) => void; // Add setError
};

const Swap: React.FC<SwapAndAddressComponentProps> = ({
  amount,
  changeAmount,
  swapType,
  setSwapStatus,
  setError,
}) => {
  const { garden, bitcoin } = useGarden();
  const [btcAddress, setBtcAddress] = useState<string>();
  const { metaMaskIsConnected } = useMetaMaskStore();
  const { wbtcAmount, btcAmount } = amount;

  const { isSigned } = useSignStore();

  useEffect(() => {
    if (!bitcoin) return;
    const getAddress = async () => {
      if (isSigned) {
        const address = await bitcoin.getAddress();
        setBtcAddress(address);
      }
    };
    getAddress();
  }, [bitcoin, isSigned]);

  const handleSwap = async () => {
    if (!garden) return;

    try {
      setSwapStatus("Processing...");

      const sendAmount = swapType === "WBTC_TO_BTC"
        ? Number(wbtcAmount) * 1e8
        : Number(btcAmount) * 1e8;

      const receiveAmount = swapType === "WBTC_TO_BTC"
        ? (1 - 0.3 / 100) * sendAmount
        : (1 - 0.3 / 100) * sendAmount;

      changeAmount(swapType === "WBTC_TO_BTC" ? "WBTC" : "BTC", "");

      await garden.swap(
        swapType === "WBTC_TO_BTC"
          ? Assets.ethereum_localnet.WBTC
          : Assets.bitcoin_regtest.BTC,
        swapType === "WBTC_TO_BTC"
          ? Assets.bitcoin_regtest.BTC
          : Assets.ethereum_localnet.WBTC,
        sendAmount,
        receiveAmount
      );

      setSwapStatus("Swap Successful!");
    } catch (error) {
      console.error("Swap Error:", error);
      setSwapStatus(null);
      setError("An error occurred while processing the swap. Please try again.");
    }
  };

  return (
    <div className="swap-component-bottom-section">
      <div>
        <label htmlFor="receive-address">Receive address</label>
        <div className="input-component">
          <input
            id="receive-address"
            placeholder="Enter BTC Address"
            value={btcAddress ? btcAddress : ""}
            onChange={(e) => setBtcAddress(e.target.value)}
          />
        </div>
      </div>
      <button
        className={`button-${metaMaskIsConnected ? "white" : "black"}`}
        onClick={handleSwap}
        disabled={!metaMaskIsConnected}
      >
        Swap
      </button>
    </div>
  );
};

export default SwapComponent;
