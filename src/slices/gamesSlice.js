import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { orderBy } from 'lodash';
import { createSlice, createAsyncThunk, isRejected, isFulfilled, isPending } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const apiBase = 'http://localhost:3000/api/games';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const { data } = await axios.get(apiBase);

    return data;
  },
);

export const addGame = createAsyncThunk(
  'games/addGame',
  async (game) => {
    const { data } = await axios.post(apiBase, game);

    return data;
  },
);

export const updateGame = createAsyncThunk(
  'games/updateGame',
  async (game) => {
    const { _id } = game;
    await axios.put(`${apiBase}/${_id}`, game);
    
    return game;
  }
);

export const removeGame = createAsyncThunk(
  'games/removeGame',
  async (id) => {
    await axios.delete(`${apiBase}/${id}`);

    return id;
  },
);

const initialState = {
  games: [],
  uiState: {
    error: null,
    loading: false,
    sort: 'updatedAt',
    asc: true,
    filter: '',
  }
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    filterGames: (state, action) => {
    },
    sortGames: (state, action) => {
      const { payload } = action;

      if (state.uiState.sort === payload) {
        state.uiState.asc = !state.uiState.asc;
      } else {
        state.uiState.sort = payload;
        state.uiState.asc = true;
      }

      const order = state.uiState.asc ? 'asc' : 'desc';

      state.games = orderBy(state.games, [state.uiState.sort], [order]);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGames.fulfilled, (state, action) => {
        state.games = action.payload;
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
      })
      .addMatcher(isPending, (state, action) => {
        // console.log(action);
        state.uiState.loading = true;
      })
      .addMatcher(isFulfilled, (state, action) => {
        // console.log(action);
        state.uiState.loading = false;
        console.log(action.type);

        switch (action.type) {
          case "games/addGame/fulfilled": 
            toast.success('Игра успешно добавлена');
            break;
          case "games/updateGame/fulfilled":
            toast.success('Игра успешно обновлена');
            break;
          case "games/removeGame/fulfilled":
            toast.warning('Игра успешно удалена');
            break;
          default:
            toast.success('Загружен список игр');
        }
      })
      .addMatcher(isRejected, (state, action) => {
        // console.log('Rejected!');
        // console.log(action);

        state.uiState.loading = false;

        toast.error("Произошла ошибка");
      });
  },
});

export const { filterGames, sortGames } = gamesSlice.actions;

export default gamesSlice.reducer;