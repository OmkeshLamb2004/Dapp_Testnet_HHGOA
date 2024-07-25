# Demo App

This project demonstrates how to use the [Garden SDK](https://docs.garden.finance/developers/sdk/) to create a simple dApp for swapping from WBTC to BTC.


## Features

- Swap Interface: Easily swap from WBTC to BTC.
- Transaction Management: Track and display the latest transactions.
- Garden SDK Integration: Uses Garden SDK to make the swap possible.
- State Management: We use [zustand](https://zustand-demo.pmnd.rs/) for state management.

## Environment Setup
This setup includes all essential components such as the [Orderbook](https://docs.garden.finance/developers/fundamentals/orderbook/), [Filler](https://docs.garden.finance/developers/fundamentals/filler/), [Faucet](https://www.alchemy.com/faucets#faucets-switchback-right-light), and nodes for Bitcoin, Ethereum, and Arbitrum.




## Project Setup

1. Clone the repository

bash
git clone https://github.com/gardenfi/demo-app
cd demo-app


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

### Instructions:
*Image*:


![](https://private-user-images.githubusercontent.com/172207607/352043711-dfb48900-26a1-432e-94b7-079387dbb87b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE5MTQ4OTEsIm5iZiI6MTcyMTkxNDU5MSwicGF0aCI6Ii8xNzIyMDc2MDcvMzUyMDQzNzExLWRmYjQ4OTAwLTI2YTEtNDMyZS05NGI3LTA3OTM4N2RiYjg3Yi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyNVQxMzM2MzFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01NWRiYzM1YjVmNTY5MjU0ZTAyYjA2ZTdhMzkxYjE1YWRmZWFhNGUzMjcwNmViNjQ1ZTBiYzU4ODA4NWU3NTZlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.PZz0mzIj0H-lvj-54DoNyYaBxMOmGx2w34yMQUUOMhw)

### Deployment:
*Site*:

[Dapp_Testnet_HHGOA](https://dapp-testnet-hhgoa.vercel.app/)
