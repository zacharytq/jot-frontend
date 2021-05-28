import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const imagesAdapter = createEntityAdapter()
const initialState = imagesAdapter.getInitialState()

export const postNewImage = createAsyncThunk(
  'images/postNewImage',
  async initialImage => {
    const response = await fetch('http://127.0.0.1:3001/images', {
      method: 'POST',
      body: initialImage
    })
    return response.json()
  }
)

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload)
    }
  },
  extraReducers: {
    [postNewImage.fulfilled]: imagesAdapter.addOne
    }
});

export const addImage = imagesSlice.actions;
export default imagesSlice.reducer;

