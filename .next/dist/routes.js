'use strict';

var routes = require('next-routes')();
// This returns the function and the second set of parantheses will invoke it.
routes.add('/campaigns/new', '/campaigns/new').add('/campaigns/:address', 'campaigns/show').add('/campaigns/:address/requests', 'campaigns/requests/index').add('/campaigns/:address/requests/new', '/campaigns/requests/new');
// :address is the wildcard

module.exports = routes;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInJvdXRlcy5qcyJdLCJuYW1lcyI6WyJyb3V0ZXMiLCJyZXF1aXJlIiwiYWRkIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFNLFNBQVcsQUFBakI7QUFDQTtBQUNBLE9BQ0ksQUFESixJQUNRLEFBRFIsa0JBQ3lCLEFBRHpCLGtCQUVJLEFBRkosSUFFUSxBQUZSLHVCQUUrQixBQUYvQixrQkFHSSxBQUhKLElBR1EsQUFIUixnQ0FHdUMsQUFIdkMsNEJBSUksQUFKSixJQUlRLEFBSlIsb0NBSTJDLEFBSjNDO0FBS0c7O0FBRUgsT0FBTyxBQUFQLFVBQWlCLEFBQWpCIiwiZmlsZSI6InJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiJDOi9Vc2Vycy9kaGlyYS9EZXNrdG9wL2tpY2tzdGFydCJ9