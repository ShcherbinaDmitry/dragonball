import axios from 'axios';
import { orderBy } from 'lodash';
import { createSlice, createAsyncThunk, isRejected, isFulfilled, isPending } from '@reduxjs/toolkit';
import { toast } from "react-toastify";

const apiBase = 'http://localhost:3000/api';

export const fetchGames = createAsyncThunk(
  'games/fetchGames',
  async () => {
    const { data } = await axios.get(`${apiBase}/games`);

    return data;
  },
);

export const addGame = createAsyncThunk(
  'games/addGame',
  async (game) => {
    const { data } = await axios.post(`${apiBase}/games`, game);

    return data;
  },
);

export const updateGame = createAsyncThunk(
  'games/updateGame',
  async (game) => {
    const { _id } = game;
    await axios.put(`${apiBase}/games/${_id}`, game);
    
    return game;
  }
);

export const removeGame = createAsyncThunk(
  'games/removeGame',
  async (id) => {
    await axios.delete(`${apiBase}/games/${id}`);

    return id;
  },
);

export const uploadImage = createAsyncThunk(
  'games/uploadImage',
  async (image) => {
    await axios.put(`${apiBase}/upload`, image);
  }
);

const initialState = {
  games: [],
  uiState: {
    error: null,
    loading: true,
    sort: 'updatedAt',
    asc: true,
    filterQuery: {
      regions: [],
      platforms: [],
      isAvailable: false,
    },
    filterAvailable: false,
    searchStr: '',
  }
};

const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    resetState: (state) => {
      state = initialState;
    },
    filterGamesByPlatform: (state, action) => {
      state.uiState.filterQuery.platforms = action.payload;
    },
    filterGamesByRegion: (state, action) => {
      state.uiState.filterQuery.regions = action.payload;
    },
    filterByAvailable: (state) => {
      state.uiState.filterQuery.isAvailable = !state.uiState.filterQuery.isAvailable;
    },
    searchGames: (state, action) => {
      state.uiState.searchStr = action.payload.trim().toLowerCase();
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
        // console.log('Fetched!');
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
        state.uiState.loading = false;

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
          case "games/uploadImage/fulfilled":
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

export const { filterGamesByPlatform, filterGamesByRegion, filterByAvailable, sortGames, searchGames, resetState } = gamesSlice.actions;

export default gamesSlice.reducer;