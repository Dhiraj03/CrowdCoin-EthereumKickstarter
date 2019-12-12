const routes =   require('next-routes')();
// This returns the function and the second set of parantheses will invoke it.
routes
   .add('/campaigns/new','/campaigns/new')
   .add('/campaigns/:address', 'campaigns/show')
   .add('/campaigns/:address/requests','campaigns/requests/index')
   .add('/campaigns/:address/requests/new','/campaigns/requests/new');
   // :address is the wildcard

module.exports = routes;