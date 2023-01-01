const hre = require("hardhat");

async function main() {

  const HanyaNFT = await hre.ethers.getContractFactory("HanyaNFT");
  const hanyaNFT = await HanyaNFT.deploy();

  await hanyaNFT.deployed();

  console.log(
    `Greeter deployed to: `, hanyaNFT.address
  );
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
