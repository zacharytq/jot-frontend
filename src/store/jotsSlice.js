import { createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit';

const jotsAdaptor = createEntityAdapter()
const initialState = jotsAdaptor.getInitialState({
  status: 'idle',
  editStatus: 'idle',
  error: null
})

export const fetchJots = createAsyncThunk('jots/fetchJots', async () => {
  const response = await fetch('http://127.0.0.1:3001/jots')
  return response.json()
})

export const acceptJot = createAsyncThunk('jots/acceptJot', async (jot) => {
  const response = await fetch(`http://127.0.0.1:3001/jots/${jot.id}`,{
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(jot)
  }).then(resp => resp.json())
  console.log(response)
  return response
})

export const updateJot = createAsyncThunk('jots/updateJot', async (jot) => {
  const response = await fetch(`http://127.0.0.1:3001/jots/${jot.id}`,{
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(jot)
  }).then(resp => resp.json())
  console.log(response)
  return response
})

export const rejectJot = createAsyncThunk('jots/rejectjot', async (jotId) => {
  const response = await fetch(`http://127.0.0.1:3001/jots/${jotId}`, {
    method: 'DELETE',
  })
  console.log(response)
  return jotId
})

const jotsSlice = createSlice({
  name: 'jots',
  initialState,
  reducers: {
    addManyJots: (state, action) => {
      jotsAdaptor.upsertMany(state, action.payload)
      state.status = 'success'
    },
    setStatusToLoading: (state) => state.status = 'loading',
    setStatusToIdle: (state) => state.status = 'idle'
  },
  extraReducers: {
    [fetchJots.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchJots.fulfilled]: (state, action) =>  {
      const payload = action.payload.data.map(jot => jot.attributes)
      jotsAdaptor.upsertMany(state, payload)
      state.status = 'success';
    },
    [fetchJots.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    },
    [acceptJot.fulfilled]: (state, action) => {
      console.log(action.payload)
      jotsAdaptor.upsertOne(state, action.payload.data.attributes)
    },
    [rejectJot.rejected]: (state, action) => {
      console.log(action.payload)
    },
    [rejectJot.fulfilled]: (state, action) => {
      jotsAdaptor.removeOne(state, action.payload)
    },
    [updateJot.pending]: (state) => {
      state.editStatus = 'loading'
    },
    [updateJot.fulfilled]: (state, action) => {
      jotsAdaptor.upsertOne(state, action.payload.data.attributes)
    }
  }
});

export const {
  selectById: selectJotById,
  selectAll: selectAllJots
} = jotsAdaptor.getSelectors(state => state.jots)

export const selectJotsByImage = (state, imageId) => selectAllJots(state).filter(jot => jot.image_id === imageId)
export default jotsSlice.reducer;
