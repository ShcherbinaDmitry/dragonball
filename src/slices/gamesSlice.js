import axios from 'axios';

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const apiBase = 'http://localhost:3000/api/games';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const { data } = await axios.get(apiBase);
    return data;
  },
);

export const addGame = createAsyncThunk(
  'games/sendGame',
  async (game) => {
    const { data } = await axios.post(apiBase, game);
    return data;
  },
);

export const removeGame = createAsyncThunk(
  'games/removeGame',
  async (id) => {
    await axios.delete(`${apiBase}/${id}`);
    return id;
  },
);

export const updateGame = createAsyncThunk(
  'games/updateGame',
  async (game) => {
    const { _id } = game;

    await axios.put(`${apiBase}/${_id}`, game)
    return _id;
  }
);

const initialState = {
  games: [],
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    filterGames: (state, action) => {
      console.log('Filtered');
      console.log(action);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        console.log('Fulfilled!');
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
        console.log('Rejected');
      })
      .addCase(addGame.fulfilled, (state, action) => {
        state.games = [action.payload, ...state.games];
      })
      .addCase(updateGame.fulfilled, (state, action) => {
        const { payload } = action;

        state.games = state.games.map((g) => {
          if (g._id !== payload._id) return g;

          return { ...g, ...payload};
        });
      })
      .addCase(removeGame.fulfilled, (state, action) => {
        const id = action.payload;
        state.games = state.games.filter((g) => g._id !== id);
      });
  },
});

export const { filterGames } = gamesSlice.actions;

export default gamesSlice.reducer;