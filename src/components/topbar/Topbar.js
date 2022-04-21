import React from 'react';

import FilterCompontent from './Filter.js';
import SortCompontent from './Sort.js';
import SearchComponent from './Search.js';
import AddGameBtn from './AddGame.js';

const Topbar = ({ setFilter }) => {

  return (
    <div className="sticky-top bg-light">
      <nav className="navbar navbar-light ">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <AddGameBtn/>
        </div>
      </nav>
      
      <div className="collapse" id="navbarContent">
        <div className="container-fluid container">
          <div className="row">
            <SearchComponent/>
            <SortCompontent/>
            <FilterCompontent/>
          </div>    
        </div>
      </div>
    </div>
  );
}

export default Topbar;