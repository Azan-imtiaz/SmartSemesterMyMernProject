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
import { addData } from '../component/contextProvider';
import Login from "./Login";

function AddCourse() {
  const [spin, setSpin] = useState(true);
  const { key, setKey } = useContext(addData);

  useEffect(() => {
    if (key) {
      setTimeout(() => {
        setSpin(false);
      }, 900);
    }
  }, [key]);

  return (
    <>
      {key ? (
        <>
          <Naavbar />
          <Container>
            <Row>
              <Col xs={12} lg={4} xl={4}><HeroSectionHome /></Col>
              {spin ? <Spinnner /> :
                <Col xs={12} lg={8} xl={8} style={{ marginTop: "130px" }}>
                  <input type="text" style={{ marginTop: "9px" }} placeholder="Enter Semester" />
                  {"      "} <Button variant="success">Filter</Button>{' '}{"                   "}
                  <input type="text" style={{ marginTop: "9px" }} placeholder="Enter Grade" />
                  {"  "} <Button variant="success">Filter</Button>{' '}
                  <br /><br />
                  <Taable />
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
