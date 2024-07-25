# Demo App

This project demonstrates how to use the [Garden SDK](https://docs.garden.finance/developers/sdk/) to create a simple dApp for swapping from WBTC to BTC.


## Features

- Swap Interface: Easily swap from WBTC to BTC and vice versa.
- Transaction Management: Track and display the latest transactions.
- Garden SDK Integration: Uses Garden SDK to make the swap possible.
- State Management: We use [zustand](https://zustand-demo.pmnd.rs/) for state management.

## Environment Setup

This setup includes all essential components such as the [Orderbook](https://docs.garden.finance/developers/fundamentals/orderbook/), [Filler](https://docs.garden.finance/developers/fundamentals/filler/), [Faucet](https://www.alchemy.com/faucets#faucets-switchback-right-light), and nodes for Bitcoin, Ethereum, and Arbitrum.


## Project Setup

1. Clone the repository

bash
git clone https://github.com/OmkeshLamb2004/Dapp_Testnet_HHGOA.git
cd Dapp_Testnet_HHGOA


2. Install dependencies

bash
bun install


3. Run the development server

bash
bun run dev


The dApp should look something like this

![final_dapp](https://github.com/user-attachments/assets/41896b69-b2cd-4528-892d-fc2adf31cf4a)

### Known Issue:
We successfully implemented and tested the code in the local environment. However, when using the Testnet, we encountered an issue with wallet transactions. Specifically, when attempting to swap BTC for WBTC on the Testnet site https://testnet.garden.finance/swap/ using a UniSat Testnet wallet address, we received an "Order Expired" error message. This issue appears to be related to the wallet or the Testnet environment and may require further investigation or adjustments.

### Issue:
![ORDER_EXPIRED](https://github.com/OmkeshLamb2004/Dapp_Testnet_HHGOA/issues/1#issue-2429437328)

### Deployment:

![Site link:](https://dapp-testnet-hhgoa.vercel.app/)
