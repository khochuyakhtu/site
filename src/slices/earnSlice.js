import { createSlice } from '@reduxjs/toolkit';
import { earnProducts } from '../resources/earnProducts.js';

const earnSlice = createSlice({
  name: 'earn',
  initialState: {
    products: earnProducts,
    filters: {
      exchange: 'Усі',
      asset: '',
      minApy: '',
      term: 'Усі'
    }
  },
  reducers: {
    setExchange(state, action) {
      state.filters.exchange = action.payload;
    },
    setAsset(state, action) {
      state.filters.asset = action.payload;
    },
    setMinApy(state, action) {
      state.filters.minApy = action.payload;
    },
    setTerm(state, action) {
      state.filters.term = action.payload;
    },
    resetEarnFilters(state) {
      state.filters = {
        exchange: 'Усі',
        asset: '',
        minApy: '',
        term: 'Усі'
      };
    }
  }
});

export const { setExchange, setAsset, setMinApy, setTerm, resetEarnFilters } =
  earnSlice.actions;
export default earnSlice.reducer;
