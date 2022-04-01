import React, { useContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/App';
import DBService from './service/dbService';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

// const dbService = new DBService();
const AppContext = React.createContext({});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AppContext.Provider value={ '1' }>
    <App />
  </AppContext.Provider>
);