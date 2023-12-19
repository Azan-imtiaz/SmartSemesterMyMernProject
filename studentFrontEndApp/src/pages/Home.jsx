import React, { useContext, useEffect, useState } from "react";
import Naavbar from "../component/navbar";
import Foooter from "../component/footer";
import HeroSectionHome from "../component/heroSectionHome";

import Container from 'react-bootstrap/Container';
import Login from "../pages/Login";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addData, addData2 } from '../component/contextProvider';

function Home() {
   const {key2,setKey2}=useContext(addData2);
  const {key,setKey}=useContext(addData);
 

  return (
    <>
      {key || key2 ? (
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
