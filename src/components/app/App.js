import React from 'react';
import Cards from '../card/Cards.js';
import Topbar from '../topbar/Topbar.js';

const App = () =>  {
  return (
        <div className="App">
          <Topbar />
          <Cards/>
      </div>
  );
}

export default App;
