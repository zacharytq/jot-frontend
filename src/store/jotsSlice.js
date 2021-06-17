import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const jotsAdaptor = createEntityAdapter()
const initialState = jotsAdaptor.getInitialState({
  status: 'idle',
  error: null
})

export const fetchJots = createAsyncThunk('jots/fetchJots', async () => {
  const response = await fetch('http://127.0.0.1:3001/jots')
  return response.json()
})

const jotsSlice = createSlice({
  name: 'jots',
  initialState,
  reducers: {
    addManyJots: (state, action) => jotsAdaptor.upsertMany(state, action.payload)
  },
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

export const {
  selectById: selectJotById
} = jotsAdaptor.getSelectors(state => state.jots)

export default jotsSlice.reducer;
