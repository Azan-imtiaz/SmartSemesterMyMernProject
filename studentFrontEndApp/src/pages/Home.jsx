import React, { useContext, useEffect, useState } from "react";
import Naavbar from "../component/navbar";
import Foooter from "../component/footer";
import HeroSectionHome from "../component/heroSectionHome";

import Container from 'react-bootstrap/Container';
import { addData } from '../component/contextProvider';
import Login from "../pages/Login";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {
  
  const {key,setKey}=useContext(addData);
   
  console.log(key)

  return (
    <>
      {key ? (
       <>
       <Naavbar />
       <Container>
         <Row>
           <Col xs={12} lg={8} xl={8}>
             <HeroSectionHome />
           </Col>
         </Row>
       </Container>
       <Foooter />
     </>

       ) : (
        <Login />
              )}
    </>
  );
}

export default Home;
