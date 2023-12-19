import Table from 'react-bootstrap/Table';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
function Taable() {
  return (
    <Table responsive>
      <thead>
        <tr>
        
         
          <th >Course</th>
          <th >Total Marks</th>
          <th >Obtained Marks</th>
          <th >Grade</th>
          <th >Semester</th>
          <th >Action</th>
        </tr>
      </thead>
      <tbody>
        <tr>
        
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
          <td><button style={{border:"1px solid white",borderRadius:"2px"}}>{<EditIcon style={{color:"green"}}/> }</button>
          <button style={{margin:"2px",border:"1px solid white",borderRadius:"2px"}}>{<DeleteIcon style={{color:"green"}}/> }</button></td>
        </tr>
        <tr>
          
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
          <td><button style={{border:"1px solid white",borderRadius:"2px"}}>{<EditIcon style={{color:"green"}}/> }</button>
          <button style={{margin:"2px",border:"1px solid white",borderRadius:"2px"}}>{<DeleteIcon style={{color:"green"}}/> }</button></td>
    
        </tr>
        <tr>
                    {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
          
          <td><button style={{border:"1px solid white",borderRadius:"2px"}}>{<EditIcon style={{color:"green"}}/> }</button>
          <button style={{margin:"2px",border:"1px solid white",borderRadius:"2px"}}>{<DeleteIcon style={{color:"green"}}/> }</button></td>
        </tr>
        <tr>
          
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
          
          <td><button style={{border:"1px solid white",borderRadius:"2px"}}>{<EditIcon style={{color:"green"}}/> }</button>
          <button style={{margin:"2px",border:"1px solid white",borderRadius:"2px"}}>{<DeleteIcon style={{color:"green"}}/> }</button></td>
        </tr>

      </tbody>
    </Table>
  );
}

export default Taable;