import React, { useState, useEffect, useContext } from 'react';

import Cards from '../card';
import Topbar from '../topbar';
import Pagination from '../pagination/Pagination';

const App = () =>  {


  return (
    <div className="App">
      <Topbar />
      <Cards/>
      <Pagination />
    </div>
  );
}

export default App;
