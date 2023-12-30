import React from 'react';
import { MDBFooter, MDBContainer } from 'mdb-react-ui-kit';

export default function Footer() {
  return (
    <div style={{ minHeight: '49vh', display: 'flex', flexDirection: 'column' }}>
      <MDBFooter className='text-center text-black' style={{ backgroundColor: '#007BFF', boxShadow: 'none', marginTop: 'auto' }}>
        <MDBContainer className='pt-4' style={{userSelect: 'none'}}>
          
      
        © 2023 Copyright:
        <a className='text-black' href='#' style={{textDecoration:"none",userSelect: 'none'}}>
        Azan_imtiaz
        </a>
           
        </MDBContainer>
      </MDBFooter>

    </div>
  );
}
