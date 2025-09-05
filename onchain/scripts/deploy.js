import hre from "hardhat";

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with account:", deployer.address);

  // Get the contract factory
  const Factory = await hre.ethers.getContractFactory("CredentialRegistry");

  // Deploy contract (pass deployer address if Ownable requires it)
  const registry = await Factory.deploy();
  await registry.waitForDeployment(); // ethers v6

  const address = await registry.getAddress();
  console.log("CredentialRegistry deployed at:", address);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
