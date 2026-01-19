const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./staking_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const pool = await ethers.getContractAt("StakingPool", config.pool, user);

    const amount = ethers.parseEther("50"); // Withdraw half
    
    console.log("Withdrawing 50 Tokens...");
    const tx = await pool.withdraw(amount);
    await tx.wait();

    console.log("Withdrawal Complete!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
