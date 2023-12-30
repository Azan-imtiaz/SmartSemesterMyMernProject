import React, { useContext, useEffect, useState } from "react";
import Naavbar from "../component/navbar";
import Foooter from "../component/footer";
import HeroSectionHome from "../component/heroSectionHome";

import Container from 'react-bootstrap/Container';
import Login from "../pages/Login";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { addData, addData2 } from '../component/contextProvider';
import UpdateResultComp from "../component/updateResultComp";
import Spinnner from "../component/spinner";


function UpdateResult() {
   const {key2,setKey2}=useContext(addData2);
  const {key,setKey}=useContext(addData);


  const [spin, setSpin] = useState(false);
 

  
useEffect(() => {
   
    // if ((key || key2)) {
    //   setTimeout(() => {
    //     setSpin(false);
    //   }, 900);

     
    // }
  });
 

  return (
    <>
      {key || key2 ? (
        <>
         <Naavbar />
         <Container>
           <Row>
             <Col xs={12} lg={4} xl={4}><HeroSectionHome /></Col>
             {spin ? <Spinnner /> :
               <Col xs={12} lg={8} xl={8} style={{ marginTop: "110px" }}>
                 <UpdateResultComp />
               </Col>
             }
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

export default UpdateResult;
