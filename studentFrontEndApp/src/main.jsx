import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { addData, addData2 } from './component/contextProvider.jsx';
import App from './App.jsx';
import './index.css';
import { Pagination } from './component/pagination.jsx';
// Wrap your rendering logic in a function
const RootComponent = () => {
  // Create your state variables
  const [key, setKey] = useState('');
  const [key2, setKey2] = useState('');

  // Create the Context Providers
  const AddDataProvider = addData.Provider;
  const AddData2Provider = addData2.Provider;

  // Render the app
  return (
    <React.StrictMode>
      {/* Wrap your components with the Context Providers  */}
       <AddDataProvider value={{ key, setKey }}>
        <AddData2Provider value={{ key2, setKey2 }}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AddData2Provider>
      </AddDataProvider>

     {/* <Pagination /> */}
    </React.StrictMode>
  );
};

// Use React.createRoot to render the app
ReactDOM.createRoot(document.getElementById('root')).render(<RootComponent />);
