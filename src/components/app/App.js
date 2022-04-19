import React from 'react';
import { ToastContainer } from 'react-toastify';
import Cards from '../cards/Cards.js';
import Topbar from '../topbar/Topbar.js';
import ErrorHandler from '../error/ErrorHandler.js';

import 'react-toastify/dist/ReactToastify.css';

const App = () =>  {
   return (
    <ErrorHandler>
      <div className="App">
        <Topbar />
        <Cards/>
        <ToastContainer newestOnTop position="bottom-right" pauseOnFocusLoss={false} autoClose={2000}/>
      </div>
    </ErrorHandler>
  );
}

export default App;
