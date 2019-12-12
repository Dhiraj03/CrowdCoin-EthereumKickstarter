const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

/* Used to delete the existing build folder
   to delete the outdated compiled version of the contract.
*/

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

/* buildPath stores the path of the build folder, where the compiled code is stored
   and updated whenever the contract code is changed.
*/
const campaignPath = path.resolve(__dirname, 'contracts', 'Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');
const output = solc.compile(source, 1).contracts;

/* campaignPath stores the path of the campaign.sol file and source contains the contents of the file,
   output contains the compiled code
*/ 
 
fs.ensureDirSync(buildPath);

// this ensures that a folder called 'build' exists, or creates it.

for(let contract in output) {
    let name = contract.replace(":", "");
    fs.outputJsonSync(
     path.resolve(buildPath, name + '.json'),
     output[contract]
 );

/* this loop goes through every key ( campaign and campaignFactory) in the output and writes it into the build folder
   as a json file.
*/
 
}