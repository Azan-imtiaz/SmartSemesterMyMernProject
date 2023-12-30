import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useEffect, useState } from 'react';
import { postRequestFromGetResultPage, deleteResultItem } from "../Services/apis";
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Spinnner from "../component/spinner";
import { ToastContainer, toast } from 'react-toastify';



function Taable({ email }) {
  const navigate = useNavigate();
  const [check, setCheck] = useState("");
  const [inp, setInp] = useState([]);
  const [refresh, setRefresh] = useState();
  const [spin, setSpin] = useState(true);


  useEffect(() => {
    fetchData();
    setTimeout(() => {
      setSpin(false);
    }, 1200)

  }, [])

  async function fetchData() {
    try {



      const res = await postRequestFromGetResultPage({ "email": email });
      if (res && res.data.st === 200) {
        setInp(res.data.d);
        setCheck(true);
      }
      else {
        setCheck(false);
      }

    } catch (err) {
      console.log(err.message);
      setCheck(false);
    }
  }

  async function deleteItem(id) {
    console.log(id);
    try{

    
    const res = await deleteResultItem({ "id": id });
    if (res && res.data.st === 200) {
     toast.success("Deleted Succesfully-Refresh");
     setInp((prevInp) => prevInp.filter((item) => item._id !== id))
    }
    else {
      toast.error("Try  Later");
    }
  }
  catch(e){
    console.log(e.message);
    toast.error("Try  Later");
  }

  }

  return (
    <div>
      {
        spin ? (
          <Spinnner />
        ) :
          (
            <> {
              check &&  inp.length > 0 ? (
                <>
                  <input type="text" style={{ marginTop: "9px", userSelect: 'none' }} placeholder="Enter Semester" />
                  {"      "} <Button variant="success">Filter</Button>{' '}{"                   "}
                  <input type="text" style={{ marginTop: "9px", userSelect: 'none' }} placeholder="Enter Grade" />
                  {"  "} <Button variant="success" >Filter</Button>{' '}
                  <br /><br />
                  <Table responsive>
                    <thead>
                      <tr>


                        <th style={{ userSelect: 'none' }}>Course</th>
                        <th style={{ userSelect: 'none' }}>Total Marks</th>
                        <th style={{ userSelect: 'none' }}>Obtained Marks</th>
                        <th style={{ userSelect: 'none' }}>Grade</th>
                        <th style={{ userSelect: 'none' }}>Semester</th>
                        <th style={{ userSelect: 'none' }}>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        inp.map(({ CN, TM, OM, GR, S, _id }, index) => (
                          <tr key={index}>
                            <td style={{ userSelect: 'none' }}>{CN}</td>
                            <td style={{ userSelect: 'none' }}>{TM}</td>
                            <td style={{ userSelect: 'none' }}>{OM}</td>
                            <td style={{ userSelect: 'none' }}>{GR}</td>
                            <td style={{ userSelect: 'none' }}>{S}</td>
                            <td>
                              <button style={{ border: "1px solid white", borderRadius: "2px" }}>
                                <Link to={`/UpdateResultItem/${_id}`}> <EditIcon style={{ color: "green" }} /></Link>
                              </button>
                              <button style={{ margin: "2px", border: "1px solid white", borderRadius: "2px" }} onClick={() => deleteItem(_id)}>
                                {<DeleteIcon style={{ color: "green" }} />}
                              </button>
                            </td>
                          </tr>
                        ))

                      }
                    </tbody>
                  </Table>
                </>
              ) : (<> <Table responsive>
                <thead>
                  <tr>


                    <th style={{ userSelect: 'none' }}>Course</th>
                    <th style={{ userSelect: 'none' }}>Total Marks</th>
                    <th style={{ userSelect: 'none' }}>Obtained Marks</th>
                    <th style={{ userSelect: 'none' }}>Grade</th>
                    <th style={{ userSelect: 'none' }}>Semester</th>
                    <th style={{ userSelect: 'none' }}>Action</th>
                  </tr>
                </thead>

                <tbody>


                  <tr ><td style={{ fontWeight: "bold", color: "blue" }}> No Result Added</td></tr>
                </tbody>

              </Table>
                
              </>)
            } </>

          )
      }
      <ToastContainer />
    </div>
  );

}

export default Taable;