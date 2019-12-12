/* This is the Home Page of the web app, that displays the addresses of the 
   campaigns, with the options to add new campaigns and view all details of
   campaigns.
*/

import React, {Component} from "react";
import factory from '../ethereum/factory';
import { Card, Button, Menu} from "semantic-ui-react";
import Layout from '../components/Layout';
import { Link } from "../routes";

class CampaignIndex extends Component {
/* This is a class function.Since rendering is computationally
   very expensive, it needs to have getInitialProps as a class 
   function, so as to execute it independently.
   To load data when the page loads, getInitialProps() is used to fetch anything
   that resolves to a JS object, which populates props.
   For the inital page load, getInitialProps() will execute on the server itself.
*/
  static async getInitialProps() {
    const campaigns = await factory.methods.getDeployedCampaigns().call();
    return { campaigns : campaigns};
  }
  renderCampaigns() {
    const items = this.props.campaigns.map(address => {
      return {
        header : address,
        description : (<Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>),
        fluid : true
      };
    });
    return <Card.Group items={items} />;
  }
  
  render() {
   return (
     <Layout>
       <div>
         <Link route='/campaigns/new'>
           <a>
         <Button
           content="Create Campaign"
           icon="add circle"
           primary
           floated="right"
         />
         </a>
         </Link>
         {this.renderCampaigns()}
       </div>
     </Layout>
   );
  }
}

export default CampaignIndex;