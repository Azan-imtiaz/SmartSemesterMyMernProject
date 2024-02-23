import React, { useState,useContext } from "react";
import Form from 'react-bootstrap/Form';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {postRequestFromAddResultPage} from "../Services/apis";
import { addData, addData2 } from './contextProvider';


export default function HeroSectionRightHome() {
  const { key, setKey } = useContext(addData);
  const [inp,setInp]=useState({ CourseName:"", TotalM:"", ObtainedM:"", Semester:"", Grade:""}
    );

   
  function  handleChange(e){
   const {name,value}=e.target;
setInp(()=>{
  return {...inp,[name]:value};
})
  }

  
  const handleSubmit=()=>{
    if(checkAllFieldFill()){
      submitData(inp);
    }
  else{
    toast.error("Fill All Fields");
  }
    
  }

  async function submitData(inp){
    
    
    const res=await  postRequestFromAddResultPage({...inp,"Email":key});
    console.log(res);
    if(res && res.data.st===200){
      toast.success("Successfuly Added");
    } else if(res && res.data.st===300){

      toast.error("Login again please");
    }
    else{
      toast.error("Enter Valid Data");
    }
  }
   
function checkAllFieldFill(){
  if(inp.CourseName==="" || inp.Grade ==="" || inp.Semester==="" || inp.TotalM==="" || inp.ObtainedM===""){
    return false;
  }
  return true;
}   
  return (
    <Container style={{ boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", margin: "auto", marginTop: "20px", marginBottom: "20px" }}>
      <h2 style={{ color: "blue",userSelect: 'none' }} >Add Course Result</h2>
      <br />
      <Form.Control type="text"  placeholder="Course Name" name="CourseName" onChange={handleChange} defaultValue={inp.CourseName}/>
      <br />
      <Form.Control type="text"  placeholder="Total Marks" name="TotalM" onChange={handleChange} defaultValue={inp.TotalM}/>
      <br />
      <Form.Control type="text" placeholder="Obtained Marks" name="ObtainedM" onChange={handleChange} defaultValue={inp.ObtainedM}/>
      <br />
      <Form.Control type="text" placeholder="Grade" name="Grade" onChange={handleChange} defaultValue={inp.Grade}/>
      <br />
      <Form.Control type="text" placeholder="Semester" name="Semester" onChange={handleChange} defaultValue={inp.Semester}/>
      
     <br /> 
      <Button onClick={handleSubmit} variant="primary" size="lg">
         Submit
        </Button>
      <br /> <br />
      <ToastContainer />
    </Container>
 
  );
}
