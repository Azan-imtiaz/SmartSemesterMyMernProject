import { addData,  addData2} from '../component/contextProvider';

import React, { useEffect, useState ,useContext} from "react";
import Naavbar from "../component/navbar";
import Foooter from "../component/footer";
import HeroSectionHome from "../component/heroSectionHome";
import HeroSectionRightHome from "../component/heroSectionRightHome";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinnner from "../component/spinner";
import Login from './Login';

function AddCourse(){
  
  const [spin,setSpin]=useState(true);
  const {key,setKey}=useContext(addData);
  const {key2,setKey2}=useContext(addData2);
   

  useEffect(()=>{
    
   if(key || key2){
    setTimeout(()=>{
      setSpin(false);
    },900);    } 

  })
    return(
      <>
      {
        key  || key2 ? (<>
          <Naavbar />
          <Container>
          
                <Row>
                  <Col xs={12} lg={4} xl={4}><HeroSectionHome /></Col>
                  {
                    spin? <Spinnner />:
                  
                  <Col xs={12} lg={8}  xl={8} style={{marginTop:"110px"}}>
                    
                  <HeroSectionRightHome />
                  </Col>
          
                  }
          
                </Row>
               
              </Container>
          
          
          <Foooter />
          </>
          )  : (<Login />)
      }
</>
    );
}

export default AddCourse;