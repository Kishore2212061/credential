import "@nomicfoundation/hardhat-toolbox";

export default {
  solidity: "0.8.23",
  networks: {
    sepolia: {
      url: "https://sepolia.infura.io/v3/d4563e9521a44c419e2242b40954b974",
      accounts: ["099a3d152873bae4a81c738c1a7587a3bd6a13f722e40331d3afeba1b7c2a935"],
    },
  },
};
