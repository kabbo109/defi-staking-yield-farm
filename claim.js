const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./staking_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const pool = await ethers.getContractAt("StakingPool", config.pool, user);

    console.log("Claiming Rewards...");
    
    const tx = await pool.getReward();
    await tx.wait();

    console.log("Rewards Claimed to Wallet!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
