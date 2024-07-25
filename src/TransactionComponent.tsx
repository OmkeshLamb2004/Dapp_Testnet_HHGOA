import {
  Actions,
  Order as OrderbookOrder,
  parseStatus,
} from "@gardenfi/orderbook";
import { useEffect, useState } from "react";
import { useGarden, useMetaMaskStore } from "./store.tsx";
import { formatUnits } from "ethers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUpRightAndDownLeftFromCenter } from "@fortawesome/free-solid-svg-icons";

function TransactionsComponent() {
  const { garden } = useGarden();
  const { evmProvider } = useMetaMaskStore();
  const [orders, setOrders] = useState(new Map<number, OrderbookOrder>());

  useEffect(() => {
    const fetchOrders = async () => {
      if (!garden || !evmProvider) return;

      const signer = await evmProvider.getSigner();
      const evmAddress = await signer.getAddress();

      if (!evmAddress) return;

      garden.subscribeOrders(evmAddress, (updatedOrders) => {
        setOrders((prevOrders) => {
          const updatedOrdersMap = new Map(prevOrders);
          let hasChanges = false;
          updatedOrders?.forEach((order) => {
            if (!updatedOrdersMap.has(order.ID) || updatedOrdersMap.get(order.ID) !== order) {
              updatedOrdersMap.set(order.ID, order);
              hasChanges = true;
            }
          });
          return hasChanges ? updatedOrdersMap : prevOrders;
        });
      });
    };

    fetchOrders();
  }, [garden, evmProvider]);

  const recentOrders = Array.from(orders.values())
    .sort((a, b) => b.ID - a.ID)
    .slice(0, 3);

  if (!recentOrders.length) return null;

  return (
    <div className="transaction-component">
      {recentOrders.map((order) => (
        <OrderComponent order={order} key={order.ID} />
      ))}
    </div>
  );
}

type Order = {
  order: OrderbookOrder;
};

const OrderComponent: React.FC<Order> = ({ order }) => {
  const { garden } = useGarden();
  const [modelIsVisible, setModelIsVisible] = useState(false);
  const [status, setStatus] = useState(order.status);

  const {
    ID: orderId,
    initiatorAtomicSwap,
    followerAtomicSwap,
    CreatedAt,
  } = order;
  const parsedStatus = parseStatus(order);
  const wbtcAmount = formatUnits(initiatorAtomicSwap.amount, 8);
  const btcAmount = formatUnits(followerAtomicSwap.amount, 8);

  const isButton = [
    Actions.UserCanInitiate,
    Actions.UserCanRedeem,
    Actions.UserCanRefund,
  ].includes(parsedStatus);
  const userFriendlyStatus = getUserFriendlyStatus(parsedStatus, order.ID);

  const [isButtonEnabled, setIsButtonEnabled] = useState(true);
  const [previousStatus, setPreviousStatus] = useState("");

  const handleClick = async () => {
    if (!garden) return;
    const swapper = garden.getSwap(order);
    try {
      const performedAction = await swapper.next();
      console.log(
        `Completed Action ${performedAction.action} with transaction hash: ${performedAction.output}`
      );
      setStatus(2); // Update status to processing after the action
      setIsButtonEnabled(false);

      // Set a timeout to revert status after a certain period, if needed
      setTimeout(() => {
        setStatus(3); // Set to completed after a delay
        setIsButtonEnabled(true);
      }, 5000); // Delay of 5 seconds

    } catch (error) {
      console.error("Swap Error:", error);
      setIsButtonEnabled(true);
    }
  };

  const toggleModelVisible = () => setModelIsVisible((pre) => !pre);

  const orderCreatedAt = new Date(CreatedAt).getTime();
  const timePassedSinceCreation = new Date().getTime() - orderCreatedAt;
  const isOrderExpired =
    (status === 1 || status === 6) &&
    Math.floor(timePassedSinceCreation / 1000) / 60 > 3;

  let decoratedStatus = isOrderExpired ? "Order expired" : "";

  console.log("ID", order.ID, "Status", status);

  if (!decoratedStatus) {
    switch (status) {
      case 3:
        decoratedStatus = "Success";
        break;
      case 4:
        decoratedStatus = "Refunded";
        break;
      default:
        decoratedStatus = userFriendlyStatus;
    }

    if (
      initiatorAtomicSwap.swapStatus === 4 ||
      initiatorAtomicSwap.swapStatus === 6
    ) {
      decoratedStatus = "Success";
    }
  }

  if (previousStatus !== decoratedStatus) {
    setIsButtonEnabled(true);
    setPreviousStatus(decoratedStatus);
  }

  const txFromBtcToWBTC =
    order.userBtcWalletAddress === order.initiatorAtomicSwap.initiatorAddress;

  const fromLabel = txFromBtcToWBTC ? "BTC" : "WBTC";
  const toLabel = txFromBtcToWBTC ? "WBTC" : "BTC";

  return (
    <div className="order">
      <div className="order-id">
        <div>
          Order Id <span>{orderId}</span>
        </div>
        <span className="enlarge">
          <FontAwesomeIcon
            icon={faUpRightAndDownLeftFromCenter}
            style={{ color: "#27272a" }}
            onClick={toggleModelVisible}
          />
        </span>
      </div>
      <div className="amount-and-status">
        <div className="amount-label">{fromLabel}</div>
        <div className="amount-label">{toLabel}</div>
        <div className="status-label">Status</div>
        <div className="amount">{wbtcAmount}</div>
        <div className="amount">{btcAmount}</div>
        <div className="status">
          {isButton ? (
            <button
              className="button-white"
              onClick={handleClick}
              disabled={!isButtonEnabled}
            >
              {decoratedStatus}
            </button>
          ) : (
            <span>{decoratedStatus}</span>
          )}
        </div>
      </div>
      {modelIsVisible && (
        <OrderPopUp
          order={order}
          toggleModelVisible={toggleModelVisible}
          fromLabel={fromLabel}
          toLabel={toLabel}
        />
      )}
    </div>
  );
};

function getUserFriendlyStatus(status: string, ID: number) {
  switch (status) {
    case Actions.NoAction:
      return "Processing";
    case Actions.UserCanInitiate:
      return "Initiate";
    case Actions.UserCanRedeem:
      return "Redeem";
    case Actions.UserCanRefund:
      return "Refund";
    case Actions.CounterpartyCanInitiate:
      return "Awaiting counterparty deposit";
    default: {
      console.log(
        `Actual Status for ${ID} `,
        status.slice(0, 1).toUpperCase() + status.slice(1)
      );
      return "Processing";
    }
  }
}

function getFormattedDate(CreatedAt: string): string {
  const date = new Date(CreatedAt);

  const formattedDate = new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);

  const formattedTime = date
    .toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(":", " : ");

  return `${formattedDate} | ${formattedTime}`;
}

type PopUp = {
  order: OrderbookOrder;
  toggleModelVisible: () => void;
  fromLabel: string;
  toLabel: string;
};

const OrderPopUp: React.FC<PopUp> = ({
  order,
  toggleModelVisible,
  fromLabel,
  toLabel,
}) => {
  const {
    ID,
    followerAtomicSwap: { redeemerAddress: to, amount: toAmount },
    CreatedAt,
    initiatorAtomicSwap: {
      initiatorAddress: from,
      amount: fromAmount,
      initiateTxHash,
      redeemTxHash,
      refundTxHash,
    },
  } = order;

  const formattedDate = getFormattedDate(CreatedAt);

  return (
    <div className="pop-up">
      <div className="pop-up-content">
        <div className="pop-up-header">
          <div className="pop-up-title">Order Details</div>
          <button className="pop-up-close" onClick={toggleModelVisible}>
            &times;
          </button>
        </div>
        <div className="pop-up-body">
          <div className="pop-up-row">
            <span className="pop-up-label">Order ID:</span>
            <span className="pop-up-value">{ID}</span>
          </div>
          <div className="pop-up-row">
            <span className="pop-up-label">Date:</span>
            <span className="pop-up-value">{formattedDate}</span>
          </div>
          <div className="pop-up-row">
            <span className="pop-up-label">From:</span>
            <span className="pop-up-value">{from}</span>
          </div>
          <div className="pop-up-row">
            <span className="pop-up-label">To:</span>
            <span className="pop-up-value">{to}</span>
          </div>
          <div className="pop-up-row">
            <span className="pop-up-label">{fromLabel} Amount:</span>
            <span className="pop-up-value">{formatUnits(fromAmount, 8)}</span>
          </div>
          <div className="pop-up-row">
            <span className="pop-up-label">{toLabel} Amount:</span>
            <span className="pop-up-value">{formatUnits(toAmount, 8)}</span>
          </div>
          <div className="pop-up-row">
            <span className="pop-up-label">Initiate Tx Hash:</span>
            <span className="pop-up-value">{initiateTxHash || "N/A"}</span>
          </div>
          <div className="pop-up-row">
            <span className="pop-up-label">Redeem Tx Hash:</span>
            <span className="pop-up-value">{redeemTxHash || "N/A"}</span>
          </div>
          <div className="pop-up-row">
            <span className="pop-up-label">Refund Tx Hash:</span>
            <span className="pop-up-value">{refundTxHash || "N/A"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionsComponent;
