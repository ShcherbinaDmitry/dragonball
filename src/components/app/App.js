import React, { useState, useEffect } from 'react';
import AppContext from '../app-context';
import DBService from '../../service/dbService';
import Cards from '../card';
import Topbar from '../topbar';
import Pagination from '../pagination/Pagination';

const App = () =>  {
  const dbService = new DBService();

  const [games, setGames] = useState([]);


  useEffect(() => {
    dbService.getGames().then((data) => {
      console.log(data);
      setGames(data);
    });
  }, []);


  return (
    <AppContext.Provider value={{ dbService }}>
        <div className="App">
          <Topbar />
          <Cards games={games}/>
          <Pagination />
      </div>
    </AppContext.Provider>
  );
}

export default App;
