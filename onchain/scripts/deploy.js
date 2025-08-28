import hre from "hardhat";

async function main() {
  // Get the contract factory
  const Factory = await hre.ethers.getContractFactory("CredentialRegistry");

  // Deploy contract (await deploy automatically waits for deployment)
  const registry = await Factory.deploy();

  // Get the deployed contract address (await in ethers v6)
  const address = await registry.getAddress();
  console.log("CredentialRegistry deployed at:", address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
