/* This file is used to render the header of every page 
  on the application. 
*/
import React from 'react';
import {Menu} from 'semantic-ui-react';
import {Link} from '../routes';

export default () => {
return (
  <Menu style={{ marginTop: "10px" }}>
    <Link route="/">
      <a className="item">CrowdCoin</a>
    </Link>
    <Menu.Menu position="right">
      <Link route="/">
        <a className="item">Campaigns</a>
      </Link>
      <Link route="/campaigns/new">
        <a className="item">+</a>
      </Link>
    </Menu.Menu>
  </Menu>
);
};