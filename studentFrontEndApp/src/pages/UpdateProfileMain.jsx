import React, { useEffect, useState, useContext } from "react";
import Naavbar from "../component/navbar";
import Foooter from "../component/footer";
import HeroSectionHome from "../component/heroSectionHome";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinnner from "../component/spinner";
import UpdateProfile from "../component/UpdateProfile";
import { addData } from '../component/contextProvider';
import Login from "./Login";

export default function UpdateProfilePage() {
  const [spin, setSpin] = useState(true);
  const { key } = useContext(addData);

  useEffect(() => {
    if (key) {
      setTimeout(() => {
        setSpin(false);
      }, 1200);
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
                <Col xs={12} lg={8} xl={8} style={{ marginTop: "50px" }}>
                  <UpdateProfile />
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
