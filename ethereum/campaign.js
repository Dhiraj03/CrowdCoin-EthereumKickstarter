/* This file exports a function that can be called elsewhere with the address where the
   contract is deployed as an argumetn and returns the instance of the contract deployed 
   at that particular address.
*/

import web3 from './web3';
import Campaign from './build/Campaign.json';

export default (address) =>
 {
     return new web3.eth.Contract(JSON.parse(Campaign.interface),
                 address);
 };