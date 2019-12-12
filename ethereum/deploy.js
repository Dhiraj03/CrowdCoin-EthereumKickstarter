// HD Wallet-enabled Web3 provider. Use it to sign transactions for addresses derived from a 12-word mnemonic.
const HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");

// gets the bytecode and the interface(ABI) from the contracts.sol file
const compiledFactory = require("./build/campaignFactory.json");

// from the previous HDWalletProvider constructor, creates the provider, which provides a link to the Infura node
// through the Infura API, by giving the 12-word mnemonic
// and the link that is given in the Infura contract project, under Rinkeby network
const provider = new HDWalletProvider(
  "salad issue fish reopen gold test globe problem elbow hour claw phone",
  "https://rinkeby.infura.io/v3/f15c170790644d87be404f2e35c6993e"
);

// creates a Web3 object that used the above provider
const web3 = new Web3(provider);

// creates a function deploy(), that is used as an asynchronous function
// this function is required as 'await' can be used only inside 'async'
const deploy = async () => {
  // gets the accounts created
  const accounts = await web3.eth.getAccounts();
  // prints the address of the MetaMask account that the contract is being deployed from
  console.log("Attempting to deploy from account", accounts[0]);
  // the 'result' variable holds the instance of the contract, deployed from accounts[0]
  const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
    .deploy({ data: compiledFactory.bytecode})
    .send({ gas: 1000000, from: accounts[0] });

  // prints the address of the contract instance account
  console.log("Contract deployed to", result.options.address);
};

//calls the above defined function
deploy();
