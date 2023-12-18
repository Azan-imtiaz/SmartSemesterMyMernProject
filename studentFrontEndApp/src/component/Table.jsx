import Table from 'react-bootstrap/Table';

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
        </tr>
      </thead>
      <tbody>
        <tr>
        
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
                    {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>
        <tr>
          
          {Array.from({ length: 5 }).map((_, index) => (
            <td key={index}>Table cell {index}</td>
          ))}
        </tr>

      </tbody>
    </Table>
  );
}

export default Taable;