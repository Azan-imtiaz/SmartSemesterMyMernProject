import React, { useEffect, useState, useContext } from "react";
import Naavbar from "../component/navbar";
import Foooter from "../component/footer";
import HeroSectionHome from "../component/heroSectionHome";
import Taable from "../component/Table";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinnner from "../component/spinner";
import Button from 'react-bootstrap/Button';
import { addData,addData2 } from '../component/contextProvider';
import Login from "./Login";
import {getDataForProfile} from "../Services/apis"

function AddCourse() {
  const [spin, setSpin] = useState(false);
  const { key, setKey } = useContext(addData);
  console.log("hello"+key);
  const {key2,setKey2}=useContext(addData2);

  const [check, setCheck] = useState("");
  // const keyValue = document.cookie.split('; ').find(cookie => cookie.startsWith('e='));
  // let e = keyValue ? keyValue.split('=')[1] : null;

  useEffect(()=>{
    const fetchData = async () => {
     if(key){

      
      try {
        const res = await getDataForProfile({ value: key })
      
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

    }   
    };

    fetchData();
  }
  ,
  )


  return (
    <>
      {((key || key2)&& check===false) ? (
        <>
          <Naavbar />
          <Container>
            <Row>
              <Col xs={12} lg={4} xl={4}><HeroSectionHome /></Col>
              {
                <Col xs={12} lg={8} xl={8} style={{ marginTop: "130px" }}>
                  
                  <Taable  email={key} />
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

export default AddCourse;
