const { ethers } = require("hardhat");
const fs = require("fs");

async function main() {
    const [deployer] = await ethers.getSigners();
    console.log("Deploying contracts with:", deployer.address);

    // 1. Deploy Mock Staking Token (Use RewardToken logic for simplicity as a mock)
    const MockToken = await ethers.getContractFactory("RewardToken");
    const stakeToken = await MockToken.deploy(); // Reuse RewardToken as "MockUSDT"
    await stakeToken.waitForDeployment();
    const stakeTokenAddr = await stakeToken.getAddress();
    console.log("Staking Token (Mock) deployed:", stakeTokenAddr);

    // 2. Deploy Actual Reward Token
    const rewardToken = await MockToken.deploy();
    await rewardToken.waitForDeployment();
    const rewardTokenAddr = await rewardToken.getAddress();
    console.log("Reward Token deployed:", rewardTokenAddr);

    // 3. Deploy Staking Pool
    const StakingPool = await ethers.getContractFactory("StakingPool");
    const pool = await StakingPool.deploy(stakeTokenAddr, rewardTokenAddr);
    await pool.waitForDeployment();
    const poolAddr = await pool.getAddress();
    console.log("Staking Pool deployed:", poolAddr);

    // 4. Grant Minting Rights to Pool
    await rewardToken.transferOwnership(poolAddr);
    console.log("Pool granted ownership of Reward Token");

    // Save Config
    const config = { pool: poolAddr, stakeToken: stakeTokenAddr, rewardToken: rewardTokenAddr };
    fs.writeFileSync("staking_config.json", JSON.stringify(config));
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
