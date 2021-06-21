import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

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
    addManyJots: (state, action) => {
      jotsAdaptor.upsertMany(state, action.payload)
      state.status = 'success'
    },
    setStatusToLoading: (state) => state.status = 'loading'
  },
  extraReducers: {
    [fetchJots.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchJots.fulfilled]: (state, action) =>  {
      const payload = action.payload.data.map(jot => ({
        id: jot.id,
        title: jot.attributes.title
      }))
      jotsAdaptor.upsertMany(state, payload)
      state.status = 'success';
    },
    [fetchJots.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
});

export const {
  selectById: selectJotById,
  selectAll: selectAllJots
} = jotsAdaptor.getSelectors(state => state.jots)

export const selectJotsByImage = (state, imageId) => selectAllJots(state).filter(jot => jot.image_id === imageId)
export default jotsSlice.reducer;
