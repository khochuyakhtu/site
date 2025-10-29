import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Resources } from '../resources/Resources.ts';

const allOption = Resources.shared.allOption;

async function requestJson(path) {
  const response = await fetch(path);
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with status ${response.status}`);
  }
  return response.json();
}

export const fetchLaunchpoolCampaigns = createAsyncThunk(
  'launchpool/fetchCampaigns',
  async (_, { rejectWithValue }) => {
    try {
      return await requestJson('/api/launchpool');
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const launchpoolSlice = createSlice({
  name: 'launchpool',
  initialState: {
    campaigns: [],
    filters: {
      status: allOption,
      exchange: allOption,
      query: ''
    },
    status: 'idle',
    error: null,
    warnings: [],
    meta: {
      updatedAt: null,
      total: 0
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLaunchpoolCampaigns.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchLaunchpoolCampaigns.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.campaigns = action.payload?.items ?? [];
        state.warnings = action.payload?.warnings ?? [];
        state.meta = {
          updatedAt: action.payload?.meta?.updatedAt ?? null,
          total: action.payload?.meta?.total ?? (action.payload?.items?.length ?? 0)
        };
      })
      .addCase(fetchLaunchpoolCampaigns.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? action.error?.message ?? null;
      });
  }
});

export const {
  setStatus,
  setLaunchpoolExchange,
  setLaunchpoolQuery,
  setCalculatorValue
} = launchpoolSlice.actions;
export default launchpoolSlice.reducer;
