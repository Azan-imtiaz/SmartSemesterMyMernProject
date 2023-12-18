import React from "react";
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function HeroSectionRightHome() {
   const handleSubmit=()=>{
    toast.error("Submitted succesfuly");
   }


   
  return (
    <Container style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", margin: "auto", marginTop: "20px", marginBottom: "20px" }}>
      <h2 style={{ color: "blue" }}>Add Course Result</h2>
      <br />
      <Form.Control type="text" placeholder="Course Name" />
      <br />
      <Form.Control type="text" placeholder="Total Marks" />
      <br />
      <Form.Control type="text" placeholder="Obtained Marks" />
      <br />
      <Form.Control type="text" placeholder="Grade" />
      <br />
      <Form.Control type="text" placeholder="Semester" />
      {/* <br /> */}
      {/* <Form.Control type="text" placeholder="Login email" /> */}
     
     <br /> 
      <Button onClick={handleSubmit} variant="primary" size="lg">
         Submit
        </Button>
      <br /> <br />
      <ToastContainer />
    </Container>
 
  );
}
