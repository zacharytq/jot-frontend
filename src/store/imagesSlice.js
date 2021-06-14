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

export const fetchImageById = createAsyncThunk(
  'images/fetchImageById',
  async imageId => {
    const response = await fetch(`http://127.0.0.1:3001/images/${imageId}`)
    return response.json()
  }
)

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload)
    },
  },
  extraReducers: {
    [postNewImage.fulfilled]: (state, action) => imagesAdapter.addOne(state, action.payload)
    // [fetchImages.fulfilled]: imagesAdapter.addMany(state, action.payload.images),
  },
    [fetchImageById.fulfilled]: (state, action) => {
      imagesAdapter.addOne(state, action.payload)
    }
});

export const imageById = (state, imageId) => imagesAdapter.getSelectors().selectById(state, imageId)

export const addImage = imagesSlice.actions;
export default imagesSlice.reducer;

