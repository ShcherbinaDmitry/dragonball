import { configureStore } from '@reduxjs/toolkit';
import gamesReducer from './gamesSlice.js';

export default configureStore({
  reducer: {
    games: gamesReducer,
  }
})