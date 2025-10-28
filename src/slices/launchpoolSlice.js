import { createSlice } from '@reduxjs/toolkit';
import { Resources, launchpoolCampaigns } from '../resources/Resources.ts';

const allOption = Resources.shared.allOption;

const launchpoolSlice = createSlice({
  name: 'launchpool',
  initialState: {
    campaigns: launchpoolCampaigns,
    filters: {
      status: allOption,
      exchange: allOption,
      query: ''
    },
    calculator: {
      deposit: 1000,
      apy: 12,
      durationDays: 30
    }
  },
  reducers: {
    setStatus(state, action) {
      state.filters.status = action.payload;
    },
    setLaunchpoolExchange(state, action) {
      state.filters.exchange = action.payload;
    },
    setLaunchpoolQuery(state, action) {
      state.filters.query = action.payload;
    },
    setCalculatorValue(state, action) {
      state.calculator = { ...state.calculator, ...action.payload };
    }
  }
});

export const {
  setStatus,
  setLaunchpoolExchange,
  setLaunchpoolQuery,
  setCalculatorValue
} = launchpoolSlice.actions;
export default launchpoolSlice.reducer;
