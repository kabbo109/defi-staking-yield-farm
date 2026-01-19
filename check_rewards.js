const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./staking_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const pool = await ethers.getContractAt("StakingPool", config.pool, user);

    console.log(`Checking rewards for ${user.address}...`);
    
    // Simulate time passing in local network
    // await ethers.provider.send("evm_increaseTime", [3600]); // +1 hour
    // await ethers.provider.send("evm_mine");

    const earned = await pool.earned(user.address);
    console.log(`Pending Rewards: ${ethers.formatEther(earned)} YIELD`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
