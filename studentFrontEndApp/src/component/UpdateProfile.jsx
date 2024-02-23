import React, { useState, useEffect ,useContext} from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import { postRequestFromRegisterPage } from '../Services/apis';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getDataForProfile,updateRequestFromUpdatePage } from '../Services/apis';
import { Base_Url } from '../Services/helper';
import { addData, addData2 } from './contextProvider';


function UpdateProfilePage() {
  const [inp, setInp] = useState({ email: "", password: "", fileName: null, semester: "", degree: "" });
  const [imagePreview, setImagePreview] = useState('');
  const [id, setId] = useState('');
  const [check, setCheck] = useState("");
  const { key, setKey } = useContext(addData);


  useEffect(() => {
    const fetchData = async () => {
     
      try {
        const res = await getDataForProfile({ value: key });
        setId(res.data.foundUser._id);

        if (res && res.data.st === 200) {
          setInp(() => ({
            degree: res.data.foundUser.degree,
            password: res.data.foundUser.password,
            email: res.data.foundUser.email,
            fileName: res.data.foundUser.fileName,
            username: res.data.foundUser.username,
            semester: res.data.foundUser.semester
          }));

          setCheck(false);
        } else if (res && res.data.st === 400) {
          setCheck(true);
        } else {
          setCheck(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setCheck(true);
      }
    };

    fetchData();
  }, []);

  function handleChange(e) {
    const { name, value, type } = e.target;
    if (type === "file") {
      const selectedFile = e.target.files[0];
      setInp(prevInp => ({ ...prevInp, [name]: selectedFile }));
      const previewUrl = URL.createObjectURL(selectedFile);
      setImagePreview(previewUrl);

    } else {
      setInp(() => ({ ...inp, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(inp);
    if (AllinputFiled()) {
      const data = new FormData();
      data.append("email", inp.email);
      data.append("username", inp.username);
      data.append("semester", inp.semester);
      data.append("degree", inp.degree);
      data.append("password", inp.password);
      data.append("fileName", inp.fileName);

      sendDataFromUpdatePage(data);
    } else {
      toast.error("Please fill out all required fields.");
    }
  }

  function AllinputFiled() {
    return inp.email !== "" && inp.password !== "" && inp.degree !== "" && inp.fileName !== null && inp.semester !== "" && inp.degree !== "";
  }

  async function sendDataFromUpdatePage(data) {
    const config = {
      "Content-Type": "multipart/form-data",
    };

    try {
     
      const res = await updateRequestFromUpdatePage(data, config,id);

      if (res && res.data.st === 200) {
        toast.success("Updated successfully");
      }  else  if (res && res.data.st === 400) {
        toast.error("Email already exists");
      }
    } catch (error) {
      toast.error("Server is down - Try later");
    }
  }

  return (
    <>
      {check ? (
        <p style={{ color: "blue" }}>Login again</p>
      ) : (
        <>
          <Container className="d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>
            <Row>
              <Col xs={12} md={8} lg={12} xl={12} className="mx-auto">
                <Form style={{ backgroundColor: '#3498db', padding: '20px', borderRadius: '8px' }}>
                  <div className="text-center mb-3">
                    {imagePreview ? (
                      <Image style={{ height: "30px", width: "25px" }} src={imagePreview} alt="profile" fluid />
                    ) : (
                      <Image style={{ height: "30px", width: "25px" }} src={`${Base_Url}/uploads/${inp.fileName}`} alt="profile" fluid />
                    )}
                  </div>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Enter Username</Form.Label>
                    <Form.Control type="text" placeholder="Enter Username" name="username" onChange={handleChange} defaultValue={inp.username} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label style={{ color: 'white' }}>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange} defaultValue={inp.email} required />
                    <Form.Text className="text-muted" style={{ color: 'white' }}>
                      All the entered info will be added to your profile
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Enter Degree</Form.Label>
                    <Form.Control type="text" placeholder="Enter Degree" name="degree" onChange={handleChange} defaultValue={inp.degree} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Enter Semester</Form.Label>
                    <Form.Control type="text" placeholder="Enter Semester" name="semester" onChange={handleChange} defaultValue={inp.semester} required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Password</Form.Label>
                    <Form.Control type="password" name="password" onChange={handleChange} defaultValue={inp.password} placeholder="Password" required />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label style={{ color: 'white' }}>Add profile image</Form.Label>
                    <Form.Control type="file" onChange={handleChange} name="fileName" defaultValue={inp.fileName} required />
                  </Form.Group>

                  <Button style={{ margin: "auto", width: "180px" }} variant="light" type="submit" onClick={handleSubmit}>
                    Update
                  </Button>{"   "}
                </Form>
              </Col>
            </Row>
            <ToastContainer />
          </Container>
        </>
      )}
    </>
  );
}

export default UpdateProfilePage ;
