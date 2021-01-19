import SplitPayment from "./contracts/SplitPayment.json";

const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [SplitPayment],
  // events: {
  //   EtherWallet: ["StorageSet"],
  // },
  polls: {
    accounts: 15000,
  },
};

export default options;
