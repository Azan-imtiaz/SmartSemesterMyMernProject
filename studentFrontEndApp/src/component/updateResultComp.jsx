import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { postRequestFromRegisterPage } from '../Services/apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateDataSingleItem, getSingleItem} from '../Services/apis';
import { Base_Url } from '../Services/helper';
import { useParams } from 'react-router-dom';
import Spinnner from "../component/spinner";
import Home from '../pages/Home';


function UpdateResultComp() {
  const [inp, setInp] = useState({  id:"",CourseName:"", TotalM:"", ObtainedM:"", Semester:"", Grade:"" });
  const {_id}=useParams();
  const [spin,setSpin]=useState(true);
  const [check,setCheck]=useState("");



  useEffect(() => {
       
       getSingleResultItem();

        setTimeout(()=>{
          setSpin(false);
        },1200);
  }, []);

     async function getSingleResultItem(){
     const res=await  getSingleItem({"id":_id});  
    
     if(res && res.data.st===200){
      let {GR,OM,S,TM,CN,_id}=res.data.d;
     setInp(()=>{
      return(
        {
          CourseName:CN, TotalM:TM, ObtainedM:OM, Semester:S, Grade:GR,id:_id
        }
      )
     })
  
     setCheck(true);


     }
     else{
      setCheck(false);
     }

     }
   function handleChange(e){
 
    setInp(()=>{
  
      let {name,value}=e.target;
    
     return({ ...inp,[name]:value});
    })
   }
   function handleSubmit(e){
    e.preventDefault();
    sendData();
   } 
async  function sendData(){ 
    const res=await updateDataSingleItem(inp);
    if(res && res.data.st){
        toast.success("Updated Successfully");
    }
    else{
      toast.error("Not updated-Try Later");
    }
   }

   return (
    <div>
      {spin ? (
        <Spinnner />
      ) : (
        check ? (
          <Container className="d-flex align-items-center justify-content-center">
            <Row>
              <Col xs={12} md={12} lg={12} xl={12} className="mx-auto">
                <Form style={{ backgroundColor: '#3498db', padding: '20px', borderRadius: '8px' }}>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Course Name</Form.Label>
                    <Form.Control type="text"  name="CourseName" onChange={handleChange} defaultValue={inp.CourseName} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Total Mark</Form.Label>
                    <Form.Control type="text"  name="TotalM" onChange={handleChange} defaultValue={inp.TotalM} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Obtained Marks</Form.Label>
                    <Form.Control type="text" name="ObtainedM" onChange={handleChange} defaultValue={inp. ObtainedM} required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Semester</Form.Label>
                    <Form.Control type="text" name="Semester" onChange={handleChange} defaultValue={inp.Semester}  required />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Grade</Form.Label>
                    <Form.Control type="text" name="Grade" onChange={handleChange} defaultValue={inp.Grade}  required />
                  </Form.Group>
                  <Button style={{ margin: 'auto', width: '180px' }} variant="light" type="submit" onClick={handleSubmit}>
                    Update
                  </Button>
                </Form>
              </Col>
            </Row>
            <ToastContainer />
          </Container>
        ) : (
           setSpin(false)
          
        )
      )}
    </div>
  );
  
}


export default UpdateResultComp;