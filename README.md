# DeFi Staking Yield Farm

![Solidity](https://img.shields.io/badge/solidity-^0.8.20-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![DeFi](https://img.shields.io/badge/sector-DeFi-orange)

## Overview

**DeFi Staking Yield Farm** is a smart contract system that incentivizes liquidity provision. It mathematically calculates rewards per second, allowing stakers to claim accumulated tokens at any time without locking periods.

## Architecture

1.  **Staking Token**: The asset users deposit (e.g., USDT, WETH, or LP Tokens).
2.  **Reward Token**: The token minted/transferred as interest ($YIELD).
3.  **Staking Pool**: The logic handling `Stake`, `Withdraw`, and `GetReward`.

## Reward Logic

The contract uses a "Reward Per Token" algorithm to ensure gas efficiency. Instead of looping through all users to update balances, the global state is updated only when a user interacts with the pool.

## Quick Start

```bash
# 1. Install
npm install

# 2. Deploy Contracts
npx hardhat run deploy.js --network localhost

# 3. Stake Tokens
node stake.js

# 4. Check Pending Rewards
node check_rewards.js

# 5. Claim Rewards
node claim.js
