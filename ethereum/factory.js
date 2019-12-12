/* This file exports the instance of the 'campaign factory' contract that has been 
   compiled and deployed at an address.
*/

import web3 from './web3';
import CampaignFactory from './build/campaignFactory.json';

const instance = new web3.eth.Contract(
  JSON.parse(CampaignFactory.interface),
  "0x125cf9D78D00A1fE8350886E0767aDC933ac9F5b"
);
  
export default instance;