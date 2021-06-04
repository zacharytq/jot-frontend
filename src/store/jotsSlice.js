import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const jotsAdaptor = createEntityAdapter()
const initialState = jotsAdaptor.getInitialState({
  status: 'idle',
  error: null
})

export const fetchJots
const jotsSlice = createSlice({
  name: 'jots',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchJots.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchJots.fulfilled]: (state, action) =>  {
      state.status = 'succeeded';
      jotsAdaptor.upsertMany(state, action.payload)
    },
    [fetchJots.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
});

export default jotsSlice.reducer;
