import React from 'react';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';



function Profile() {


    return (
    <Card className="w-100" style={{maxWidth:"60rem", boxShadow: "0 2px 4px blue", margin: "50px auto",textAlign: "center"}}>
      <div style={{ position: "relative", width: "150px", height: "150px", overflow: "hidden", borderRadius: "50%", margin: "0 auto" }}>
        <Card.Img variant="top" src="./MyImage.jpg" style={{ objectFit: "cover", width: "100%", height: "100%" }} />
      </div>
      <Card.Body>
        <Card.Title>Azan imtiaz</Card.Title>
        <Card.Text>
         Student of Bs software engineering
        </Card.Text>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item>azanimtiaz43@gmail.com</ListGroup.Item>
        <ListGroup.Item>Cnic </ListGroup.Item>
        <ListGroup.Item>Password</ListGroup.Item>
      </ListGroup>
     
    </Card>
  );

}

export default Profile;
