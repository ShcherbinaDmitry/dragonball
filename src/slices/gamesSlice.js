import axios from 'axios';
import { orderBy } from 'lodash';

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
    return game;
  }
);

const initialState = {
  games: [],
  activeSort: {
    type: 'updatedAt',
    asc: true,
  },
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    filterGames: (state, action) => {
    },
    sortGames: (state, action) => {

      const { payload } = action;

      if (state.activeSort.type === payload) {
        state.activeSort.asc = !state.activeSort.asc;
      } else {
        state.activeSort.type = payload;
        state.activeSort.asc = true;
      }

      const order = state.activeSort.asc ? 'asc' : 'desc';

      state.games = orderBy(state.games, [state.activeSort.type], [order]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.games = action.payload;
      })
      .addCase(fetchGames.rejected, (state, action) => {
      })
      .addCase(addGame.fulfilled, (state, action) => {
        state.games = [action.payload, ...state.games];
      })
      .addCase(addGame.rejected, (state, action) => {
        console.log(action.error);
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

export const { filterGames, sortGames } = gamesSlice.actions;

export default gamesSlice.reducer;