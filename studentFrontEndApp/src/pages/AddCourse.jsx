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
import { getDataForProfile } from '../Services/apis';

function AddCourse(){
  
  const [spin,setSpin]=useState(true);
  const {key,setKey}=useContext(addData);
  const {key2,setKey2}=useContext(addData2);
  const [check, setCheck] = useState("");
  
  const keyValue = document.cookie.split('; ').find(cookie => cookie.startsWith('e='));
  let e = keyValue ? keyValue.split('=')[1] : null;

   

  useEffect(()=>{
    const fetchData = async () => {
      const keyValue = document.cookie.split('; ').find(cookie => cookie.startsWith('e='));
      let e = keyValue ? keyValue.split('=')[1] : null;

      try {
        const res = await getDataForProfile({ value: e })
      
        if (res && res.data.st === 200) {
          setCheck(false);

        } else if (res && res.data.st === 400) {
          setKey('');
          setKey2('');
          setCheck(true);

        } else {
          setKey('');
          setKey2('');
          setCheck(true);
        }
      } catch (error) {
        setKey('');
        setKey2('');
        console.error("Error fetching data:", error);
        setCheck(true);
      }

       console.log("hel"+   ((key || key2)&& check===false) )    //true
       
   if(((key || key2)&& check===false)){
    console.log(spin)
    setTimeout(()=>{
      setSpin(false);
    },900);  
     
  }
    };

    fetchData();
  }
  
  )
    return(
      <>
      {
        ((key||key2)&& check===false)
       
         ? (<>
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