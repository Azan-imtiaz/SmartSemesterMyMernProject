import Table from 'react-bootstrap/Table';

import DeleteIcon from '@mui/icons-material/Delete';

import EditIcon from '@mui/icons-material/Edit';


import { useEffect, useState } from 'react';

import { postRequestFromGetResultPage, deleteResultItem, getFilterData, getExportData } from "../Services/apis";

import Button from 'react-bootstrap/Button';

import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import Spinnner from "../component/spinner";

import { ToastContainer, toast } from 'react-toastify';
import Paginations from './pagination';
function Taable({ email }) {
  const navigate = useNavigate();

  const [check, setCheck] = useState("");
  const [renderWhenDelete, setRenderWhenDelete] = useState("");


  const [inp, setInp] = useState([]);

  const [refresh, setRefresh] = useState();

  const [spin, setSpin] = useState(true);

  const [semester, setSemester] = useState("");

  const [grade, setGrade] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);


  useEffect(() => {
    if (grade != "" || semester != "") {
   handleFilterClick();
    }
    else {
      fetchData();
    }

    setTimeout(() => {
      setSpin(false);
    }, 1200)

  }, [page,renderWhenDelete])

  async function fetchData() {
    try {



      const res = await postRequestFromGetResultPage({ "email": email, "page": page });

      if (res && res.data.st === 200) {
        setInp(res.data.d);
        // console.log(res.data);
        setPageCount(res.data.pagination.totalPages);
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
    try {


      const res = await deleteResultItem({ "id": id,"pages":page });
      if (res && res.data.st === 200) {
        toast.success("Deleted Succesfully");
        // setInp((prevInp) => prevInp.filter((item) => item._id !== id))
        // setPageCount(res.data.pagination.totalPages);
        if (grade != "" || semester != "") {
          handleFilterClick();
           }
           else {
             fetchData();
           }
      }
      else {
        toast.error("Try  Later");
      }
    }
    catch (e) {
      console.log(e.message);
      toast.error("Try  Later");
    }

  }


  function handleFilterChange(e) {
    const { name, value } = e.target;

    if (name === "semesterFilter") {
      setSemester(value);
    }

    if (name === "gradeFilter") {
      setGrade(value);
    }


  }

  const handleFilterClick = async () => {
    try {



      const res = await getFilterData({ semesterF: semester, gradeF: grade, "email": email ,"page":page});
     
      if (res && res.data.st === 200) {

        setInp(res.data.d);
        console.log(res.data);
        setPageCount(res.data.pagination.totalPages);
        setCheck(true);

      }
      else {

        setCheck(false);

      }

    }
    catch (err) {
      console.log(err.message);

      setCheck(false);
    }
  }


  async function handleClick() {
    try {
      const res = await getExportData({ semesterF: semester, gradeF: grade, "email": email });

      if (res && res.data.st === 200) {


        window.open(res.data.downloadUrl);



      }
      else {

        toast.error("Error !");

      }


    }
    catch (err) {
      console.log(err.message);


    }

  }


  const handlePrevious = () => {
    setPage(() => {
      if (page === 1) return page;
      return page - 1;
    })
  }


  const handleNext = () => {
    setPage(() => {
      if (page === pageCount) return page;
      return page + 1;
    })
  }

  return (
    <div>
      {
        spin ? (
          <Spinnner />
        ) :
          (
            <>
              {"  "} <Button variant="success" style={{ backgroundColor: "blue", border: "2px solid blue" }} onClick={handleClick} >Export to csv</Button>{' '}
              <br /><br />
              <input type="text" style={{ marginTop: "9px", userSelect: 'none' }} value={semester} onChange={handleFilterChange} name="semesterFilter" placeholder="Enter Semester" />
              {"      "} <Button variant="success" onClick={handleFilterClick}>Filter</Button>{' '}{"                   "}
              <input type="text" style={{ marginTop: "9px", userSelect: 'none' }} value={grade} onChange={handleFilterChange} name="gradeFilter" placeholder="Enter Grade" />
              {"  "} <Button variant="success" onClick={handleFilterClick}  >Filter</Button>{' '}
              <br /><br />

              {
                check && inp.length > 0 ? (
                  <>
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
                              <td style={{ userSelect: 'none' }} >{CN}</td>
                              <td style={{ userSelect: 'none', paddingLeft: "30px" }}>{TM}</td>
                              <td style={{ userSelect: 'none', paddingLeft: "50px" }}>{OM}</td>
                              <td style={{ userSelect: 'none', paddingLeft: "20px" }}>{GR}</td>
                              <td style={{ userSelect: 'none', paddingLeft: "30px" }}>{S}</td>
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

                    <Paginations
                      handlePrevious={handlePrevious}
                      handleNext={handleNext}
                      page={page}
                      pageCount={pageCount}
                      setPage={setPage}
                    />
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