/* This file is used to import React-CSS, to give styling to the web application.
   Props is short for PROPERTIES, which are objects that are passed to React 
   components. Though functional components are stateless, props can be used within
   functions.
   this.props.children => Stateful components
   props.children => Stateless components   
*/

import React from 'react';
import {Container} from 'semantic-ui-react';
import Header from './Header';
import Head from 'next/head';
export default (props) => {
 return (
   <Container>
     <Head>
       <link
         rel="stylesheet"
         href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css"
       />
     </Head>

     <Header />
     {props.children}
   </Container>
 );

};