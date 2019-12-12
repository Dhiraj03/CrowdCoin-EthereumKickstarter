/* This testing script is written to test the working of the methods in the smart contract.
   For this, a provider is used to gain access to the Ethereum Test network ( ganache ) 
   through a ganache provider.
*/

const assert = require('assert');
// to check if the values are equal/ whether they are undefined

const ganache = require('ganache-cli');
// Ganache is a personal blockchain that can be used for smart contract deployment and testing

const Web3 = require('web3');
// Web3 is the interface to gain programmer-access on the Ethereum network, to interact with the Eth network

const web3 = new Web3(ganache.provider());
// A provider gives a link to a working node in the required network, to provide a connection 
// Here, the provider connects to a node in the ganache TestRPC

/* Here, the interface and the bytecode are not taken separately, as
   compiledFactory and compiledCampaign will contain the compiled code
*/
const compiledFactory = require('../ethereum/build/campaignFactory.json');
const compiledCampaign = require('../ethereum/build/Campaign.json');

let accounts;
let factory;
let campaignAddress;
let campaign;

/*  ABI => Application Binary Interface => It is a 
    JSON file that describes the deployed contract and its
    functions.
    Ethereum contracts run on Ethereum nodes, and EVM ( Ethereum virtual machines )
    are responsible to run the instructions, from the bytecode.
*/

beforeEach ( async () => {
    accounts = await web3.eth.getAccounts();
    factory = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
     .deploy({ data : compiledFactory.bytecode})
     .send({from : accounts[0], gas : '4000000'});

await factory.methods.createCampaign('100').send({
    from : accounts[0], gas : '4000000' 
});

[campaignAddress] = await factory.methods.getDeployedCampaigns().call();
/* The variable returned by the RHS is an array of deployed campaigns,
   so [campaignAddress] sets the address of the first deployed campaign to
   the variable campaignAddress.
*/
campaign = await new web3.eth.Contract(
  JSON.parse(compiledCampaign.interface),
  campaignAddress
  );
});

/*  Execute some general setup code before testing.
   'async' marks that it is a asynchronous function that is a promise.
   getAccounts() gets all the accounts that have been created in the Ganache TestRPC for testing.
   creates an instance of the contract, deployed FROM the address accounts[0], with max gas = 1000000
   .deploy =>  the data of the transaction is the bytecode and JSON.parse() converts the interface to JS code
   arguments is used to pass the initial constructor arguments to the instance of the contract
   Instances of the campaignFactory contract and campaign contract are declared => factory and campaign.
*/

describe('Campaigns', () => {
    require("events").EventEmitter.defaultMaxListeners = 0;

    it('deploys a factory and a campaign', () => {
      assert.ok(factory.options.address);
      assert.ok(campaign.options.address);  
    });
    
    it('manager is set properly', async () => {
      const manager = await campaign.methods.manager().call();
      assert.equal(accounts[0],manager);
    });

    it('allows contribution', async() =>{
      await campaign.methods.contribute()
        .send({from : accounts[1],
              value : '200'});
        const isContributor = await campaign.methods.approvers(accounts[1]).call();
        assert(isContributor);
    });

    it('requires a minimum contribution', async() => {
      try {
       await campaign.methods.contribute().send({
        value : '5',
        from:accounts[0]
       });
       assert('false');
      } catch(err){
          assert(err);
      }
    });
    
    it('allows a manager to make a payment request', async() => {
      await campaign.methods
        .CreateRequest('buy something', '100', accounts[1])
        .send({
          from : accounts[0],
          gas : '1000000'
        });
        const request = await campaign.methods.requests(0).call();
        assert.equal('buy something',request.description);
    }); 

    it('processes requests', async() => {
      await campaign.methods.contribute().send({
        from : accounts[0],
        value: web3.utils.toWei('10','ether')
      });
      await campaign.methods
        .CreateRequest("buy something", web3.utils.toWei('5','ether'), accounts[1])
        .send({
          from: accounts[0],
          gas: "1000000"
        });
      await campaign.methods.approveRequest(0).send({
        from  : accounts[0],
        gas : '100000'
      });
      await campaign.methods.finalizeRequest(0).send({
        from : accounts[0],
        gas : '1000000'
      });
     let balance =  await web3.eth.getBalance(accounts[1]);
     balance = web3.utils.fromWei(balance, 'ether');
     balance = parseFloat(balance);
     // Parse float converts a string into a floating-point number
     // console.log(balance);
     assert(balance  > 104);
    });

});

/* it() functions are used to test elements of the smart contract => run a test and make an assertion
   describe() groups together it() functions
   It has only function, to check whether the instances of the two contracts have been deployed successfully.
*/
