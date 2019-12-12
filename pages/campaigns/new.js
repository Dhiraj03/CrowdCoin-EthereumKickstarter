// This page is used to create a new campaign. 

import React,{Component} from 'react';
import Layout from  '../../components/Layout';
import {Form, Button, Input, Message} from 'semantic-ui-react';
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import { Router } from '../../routes';

class CampaignNew extends Component {
    state = {
        minimumContribution : '',
        errorMessage:'',
        loading:false
    };
/* State is an instance of a React component class that can be defined as an 
   object of a set of observable properties that control the behaviour of the
   component.
*/  
    onSubmit = async (event) => {
        event.preventDefault();
        this.setState({loading:true, errorMessage:''});
     try {    
        const accounts = await web3.eth.getAccounts();
        await factory.methods
          .createCampaign(this.state.minimumContribution)
          .send({
           from : accounts[0]
          });

          Router.pushRoute('/');
        } catch(err) {
          this.setState({ errorMessage : err.message});
        }
      this.setState({loading:false});
    };

/* This onSubmit function is used to create a campaign when the user clicks on 
   'Create A campaign',  and tests for errors too.
*/
    render() {
       return( 
        
       <Layout>
          <h3>Create A Campaign!</h3>
          <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
             <Form.Field>
            <label>Minimum Contribution</label>
            <Input 
               label="wei" 
               labelPosition="right"
               value={this.state.minimumContribution}
               onChange={event => 
               this.setState({minimumContribution: event.target.value})}
            />
            </Form.Field>
            <Message error header="Oops!" content={this.state.errorMessage} />
            <Button loading={this.state.loading} primary>Create!</Button>
          </Form>
        </Layout>);
    }
}

export default CampaignNew;