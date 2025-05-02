import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  status: 'idle', // добавляем статус для отслеживания состояния запроса
  error: null, // добавляем поле для ошибок
};

export const fetchPizzas = createAsyncThunk('pizza/fetchPizzasStatus', async (params) => {
  const { currentPage, categoryId, sortType, orderType } = params;
  const { data } = await axios.get(
    `https://677e934394bde1c1252c8ede.mockapi.io/items?page=${currentPage}&limit=4&${
      categoryId > 0 ? `category=${categoryId}` : ``
    }&sortBy=${sortType}&order=${orderType}`,
  );
  return data;
});

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
