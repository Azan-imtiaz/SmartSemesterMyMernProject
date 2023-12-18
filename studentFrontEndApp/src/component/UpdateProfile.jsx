import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import {Link} from "react-router-dom";
function UpdateProfile() {
  return (
    <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
      <Row>
        <Col xs={12} md={12} lg={12} xl={12} className="mx-auto">
          <Form style={{ backgroundColor: '#3498db', padding: '20px', borderRadius: '8px' }}>
            <div className="text-center mb-3">
              <Image style={{height:"30px",width:"25px"}} src="./MyImage.jpg" alt="profile" fluid />
            
            </div>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
              <Form.Text className="text-muted" style={{ color: 'white' }}>
                All the entered info will be added to your peofile
              </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'white' }}>Enter Degree</Form.Label>
              <Form.Control type="password" placeholder="Enter Degree" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'white' }}>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label style={{ color: 'white' }}>Add profile image</Form.Label>
              <Form.Control type="file"/>
            </Form.Group>

            
            <Button  style={{margin:"auto",width:"180px"}} variant="light" type="submit">
              Update
            </Button>{"   "}
            
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default UpdateProfile;
