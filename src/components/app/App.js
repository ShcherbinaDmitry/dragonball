import React from 'react';
import Cards from '../cards/Cards.js';
import Topbar from '../topbar/Topbar.js';

import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const App = () =>  {
  return (
    <div className="App">
      <ToastContainer newestOnTop position="bottom-right" pauseOnFocusLoss={false} autoClose={2000}/>
      <Topbar />
      <Cards/>
    </div>
  );
}

export default App;
