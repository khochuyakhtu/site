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

export const fetchEarnProducts = createAsyncThunk(
  'earn/fetchProducts',
  async (_, { rejectWithValue }) => {
    try {
      return await requestJson('/api/earn');
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

export const fetchStakingPrograms = createAsyncThunk(
  'earn/fetchStaking',
  async (_, { rejectWithValue }) => {
    try {
      return await requestJson('/api/staking');
    } catch (error) {
      return rejectWithValue({ message: error.message });
    }
  }
);

const earnSlice = createSlice({
  name: 'earn',
  initialState: {
    products: [],
    filters: {
      exchange: allOption,
      asset: '',
      minApy: '',
      term: allOption
    },
    status: 'idle',
    error: null,
    warnings: [],
    meta: {
      updatedAt: null,
      total: 0
    },
    staking: {
      items: [],
      status: 'idle',
      error: null,
      warnings: [],
      meta: {
        updatedAt: null,
        total: 0
      }
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEarnProducts.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchEarnProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload?.items ?? [];
        state.warnings = action.payload?.warnings ?? [];
        state.meta = {
          updatedAt: action.payload?.meta?.updatedAt ?? null,
          total: action.payload?.meta?.total ?? (action.payload?.items?.length ?? 0)
        };
      })
      .addCase(fetchEarnProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload?.message ?? action.error?.message ?? null;
      })
      .addCase(fetchStakingPrograms.pending, (state) => {
        state.staking.status = 'loading';
        state.staking.error = null;
      })
      .addCase(fetchStakingPrograms.fulfilled, (state, action) => {
        state.staking.status = 'succeeded';
        state.staking.items = action.payload?.items ?? [];
        state.staking.warnings = action.payload?.warnings ?? [];
        state.staking.meta = {
          updatedAt: action.payload?.meta?.updatedAt ?? null,
          total: action.payload?.meta?.total ?? (action.payload?.items?.length ?? 0)
        };
      })
      .addCase(fetchStakingPrograms.rejected, (state, action) => {
        state.staking.status = 'failed';
        state.staking.error = action.payload?.message ?? action.error?.message ?? null;
      });
  }
});

export const { setExchange, setAsset, setMinApy, setTerm, resetEarnFilters } =
  earnSlice.actions;
export default earnSlice.reducer;
