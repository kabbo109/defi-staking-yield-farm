const { ethers } = require("hardhat");
const fs = require("fs");
const config = require("./staking_config.json");

async function main() {
    const [user] = await ethers.getSigners();
    const pool = await ethers.getContractAt("StakingPool", config.pool, user);
    const token = await ethers.getContractAt("RewardToken", config.stakeToken, user);

    const amount = ethers.parseEther("100");

    console.log("Approving tokens...");
    // Must mint tokens to self first if using the Mock
    // await token.mint(user.address, amount); 
    
    await token.approve(config.pool, amount);
    
    console.log("Staking 100 Tokens...");
    const tx = await pool.stake(amount);
    await tx.wait();

    console.log("Staked Successfully!");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
