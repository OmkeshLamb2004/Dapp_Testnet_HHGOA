## Project Setup

To get started with this project, follow these steps:

1. **Clone the repository**

   ```bash 
   git clone https://github.com/gardenfi/demo-app
   ```
   ```bash
   cd Dapp_Testnet_HHGOA
   ```


2. **Install dependencies**

   ```bash
   bun install
   ```

3. **Run the development server**

   ```bash
   bun run dev
   ```

## dApp Preview

The dApp should look something like this:

![final_dapp](https://github.com/user-attachments/assets/41896b69-b2cd-4528-892d-fc2adf31cf4a)

### Known Issue

We successfully implemented and tested the code in the local environment. However, when using the Testnet, we encountered an issue with wallet transactions. Specifically, when attempting to swap BTC for WBTC on the Testnet site [https://testnet.garden.finance/swap/](https://testnet.garden.finance/swap/) using a UniSat Testnet wallet address, we received an "Order Expired" error message. This issue appears to be related to the wallet or the Testnet environment and may require further investigation or adjustments.

### Instructions

*Image*:

![Instructions](https://private-user-images.githubusercontent.com/172207607/352043711-dfb48900-26a1-432e-94b7-079387dbb87b.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MjE5MTQ4OTEsIm5iZiI6MTcyMTkxNDU5MSwicGF0aCI6Ii8xNzIyMDc2MDcvMzUyMDQzNzExLWRmYjQ4OTAwLTI2YTEtNDMyZS05NGI3LTA3OTM4N2RiYjg3Yi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjQwNzI1JTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI0MDcyNVQxMzM2MzFaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT01NWRiYzM1YjVmNTY5MjU0ZTAyYjA2ZTdhMzkxYjE1YWRmZWFhNGUzMjcwNmViNjQ1ZTBiYzU4ODA4NWU3NTZlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCZhY3Rvcl9pZD0wJmtleV9pZD0wJnJlcG9faWQ9MCJ9.PZz0mzIj0H-lvj-54DoNyYaBxMOmGx2w34yMQUUOMhw)

### Deployment

*Site*:

[Dapp_Testnet_HHGOA](https://dapp-testnet-hhgoa.vercel.app/)



## Deploying to Vercel

You can deploy your project to Vercel using either the Vercel CLI or through the Vercel website. Here’s how to do both:

### Method 1: Using Vercel CLI

1. **Install Vercel CLI**

   If you haven't already, install the Vercel CLI globally on your system:

   ```bash
   npm install -g vercel
   ```

2. **Navigate to Your Project Directory**

   Open your terminal or command prompt and navigate to your project directory:

   ```bash
   cd Dapp_Testnet_HHGOA
   ```

3. **Deploy Your Project**

   Run the Vercel deployment command:

   ```bash
   vercel
   ```

4. **Follow the Prompts**

   You will be prompted with a series of questions. Respond as follows:

   - **Scope (Team or Personal Account)**:
     - Choose whether to deploy under your personal account or a team account. If you are not part of a team, select your personal account.

   - **Project Name**:
     - Vercel will suggest a default name based on your directory name. You can accept this default or enter a new name for your project.

   - **Root Directory**:
     - Vercel will ask if you want to configure the root directory. The default is usually correct. Press Enter to accept it.

   - **Link to Existing Project**:
     - If this is your first deployment, choose not to link to an existing project. If you have previously deployed the project and want to link to it, select the relevant option.

   Vercel will automatically detect your build configuration based on your `package.json` and `vite.config.ts` files. It will then build and deploy your project.

5. **Access Your Deployed Site**

   Once the deployment is complete, Vercel will provide you with a URL where your site is live. Use this URL to access your deployed site.

6. **Additional Configuration (Optional)**

   - **Custom Domain**:
     - To set up a custom domain, go to the Vercel dashboard, select your project, and navigate to the "Domains" section to add your custom domain.

   - **Environment Variables**:
     - If your project requires environment variables, configure them in the Vercel dashboard under the "Settings" section of your project.

7. **Test Your Deployment**

   Verify that your site works as expected. Check all functionalities and ensure there are no issues.

---

### Method 2: Deploying via Vercel Website

1. **Sign Up / Log In to Vercel**

   Go to [Vercel](https://vercel.com/) and sign up or log in to your account.

2. **Create a New Project**

   - Click on the **"New Project"** button on your Vercel dashboard.

3. **Import Your Project**

   - You will be prompted to connect to a Git provider (GitHub, GitLab, or Bitbucket). Authenticate and authorize Vercel to access your repositories.

   - Select the repository that contains your project.

4. **Configure the Project**

   - Vercel will automatically detect your build settings. Review and adjust the settings if needed. Ensure that the root directory is set correctly (usually it will default to the correct directory).

5. **Deploy Your Project**

   - Click the **"Deploy"** button. Vercel will build and deploy your project.

6. **Access Your Deployed Site**

   - Once the deployment is complete, Vercel will provide you with a URL where your site is live. Use this URL to access your deployed site.

7. **Additional Configuration (Optional)**

   - **Custom Domain**:
     - To set up a custom domain, go to the Vercel dashboard, select your project, and navigate to the "Domains" section to add your custom domain.

   - **Environment Variables**:
     - If your project requires environment variables, configure them in the Vercel dashboard under the "Settings" section of your project.

8. **Test Your Deployment**

   - Verify that your site works as expected. Check all functionalities and ensure there are no issues.


