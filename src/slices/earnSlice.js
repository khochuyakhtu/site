import { createSlice } from '@reduxjs/toolkit';
import { Resources, earnProducts } from '../resources/Resources.ts';

const allOption = Resources.shared.allOption;

const earnSlice = createSlice({
  name: 'earn',
  initialState: {
    products: earnProducts,
    filters: {
      exchange: allOption,
      asset: '',
      minApy: '',
      term: allOption
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
        exchange: allOption,
        asset: '',
        minApy: '',
        term: allOption
      };
    }
  }
});

export const { setExchange, setAsset, setMinApy, setTerm, resetEarnFilters } =
  earnSlice.actions;
export default earnSlice.reducer;
