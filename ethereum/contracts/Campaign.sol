pragma solidity^0.4.17;

/*  The campaignFactory contract is designed to deploy instances of the contract campaign. This is needed to make
    sure that the deployment cost of the campaign is paid by the campaign manager, but the manager does not have the
    power to tamper with the code of the contract to prevent fraud.
*/
/*  User clicks 'Create Contract', is led to MetaMask to approve the transaction to deploy a campaign, pays the
    deployment code
*/


contract campaignFactory{
    address[] public deployedCampaigns;
    
    function createCampaign(uint minimum) public {
        address newCampaign = new Campaign(minimum, msg.sender);
        deployedCampaigns.push(newCampaign);
    }
    
    function getDeployedCampaigns() public view returns (address[]){
        return deployedCampaigns;
    }
}

/*  createCampaign passes the minimumContribution and the manager of the contract as arguments to the constructor
    of the campaign contract. getDeployedCampaigns returns the array of campaigns deployed.
*/

/*
    The contract campaign describes the behaviour and features of an instance of a campaign
*/


contract Campaign
{  struct Request {
    string description;
    uint value;
    address recipient;
    bool complete;
    uint approvalCount;
    mapping (address => bool) approvals;
}

/*
    A request structure is created to hold the features of a payment request made by the campaign manager.
    description =>  contains a description of the payment request
    value => amt of ether to be sent across
    recipient => address of the acc to transfer the ether to
    complete => status of payment
    approvalCount => number of approvals
    approvals => mapping of the contributors' addresses and their approval status 
*/

/*  When an instance of a structure is declared and initialised, any variables of reference type don't
    need initialisation.
*/
/*  During the approval phase of a payment request, there is no difference between voting and not voting,
    both are considered to be the same response.
*/
 
    

    Request[] public requests;
    address public manager;
    uint minimumContribution;
    mapping (address => bool) public approvers;
    uint public approversCount;

/*  requests => an array of the requests made during this campaign
    manager => address of the manager/creator of this campaign
    minimumContribution => minimum amount of ether to be contributed to become an approver
    approvers => mapping of the addresses of the contributors to TRUE
    approversCount => number of approvers of the campaign
*/        
    
    
    modifier restricted()
    { require(msg.sender==manager);
        _;
    }
/* Modifiers create additional features on a function or apply some restriction on the execution of a function.
_; => the function code where this modifier is used is placed here.
*/  
  
    function Campaign(uint minimum, address creator) public {
        manager = creator;
        minimumContribution = minimum;
    }

/* This is constructor function which sets the campaign manager to be the sender of the contract campaignFactory,
and sets the minimumContribution.
*/
       
    function contribute() public payable {
        require(msg.value > minimumContribution);
        approvers[msg.sender] = true;
        approversCount++;
          
    }
/* Method to be called to become an approver, set as a payable function, sets the mapping of the address
of the sender to TRUE, and increases the count of approvers, if the contribution is greater than the minimum
contribution.
*/

    function CreateRequest(string description, uint value, address recipient) 
        public restricted {
        Request memory newRequest = Request({
            description : description,
            value : value,
            recipient : recipient,
            complete : false,
            approvalCount:0
        });             
        requests.push(newRequest);
    }
/*  CreateRequest is used to create a payment request. Can be called by the campaign manager ONLY. The
    description, value and recipient arguments are passed and an instance of the structure campaign is created,
    and is pushed into the requests array.
*/

    function approveRequest(uint index) public {
        Request storage request = requests[index];
         
        require(approvers[msg.sender]);
        require(!request.approvals[msg.sender]);
        request.approvals[msg.sender] = true;
        request.approvalCount++;
         
    }

/*  Used to approve a request. The address of the sender should be mapped to TRUE in the approvers array,
    and the approver should not have already approved the request, then the address is mapped to TRUE in 
    the approvals array, and the approvalCount is incremented.
*/

    function finalizeRequest(uint index) public restricted
    {
        Request storage request = requests[index];
        require(!request.complete);
        require(request.approvalCount > (approversCount/2));
        request.recipient.transfer(request.value);
        request.complete = true;
         
    }
/*  Given the ID of the request (index), provided that the sender of the message is the campaign manager,
    the request is not yet complete, and consensus for approval is present, COMPLETE the payment and update 
    completion state of the instance of that request.
*/
   function getSummary() public view returns(
       uint, uint, uint, uint, address
   )
    { 
        return(
          minimumContribution,
          this.balance,
          requests.length,
          approversCount,
          manager 
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }
  

}

