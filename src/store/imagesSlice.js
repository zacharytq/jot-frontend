import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const imagesAdapter = createEntityAdapter()
const initialState = imagesAdapter.getInitialState({
  status: 'idle'
})

export const fetchImages = createAsyncThunk(
  'images/fetchImages',
  async () => {
    const response = await fetch('http://127.0.0.1:3001/images').then(resp => resp.json())
    return response
  }
)

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
  'images/fetchImagebyId',
  async (imageId) => {
    const response = await fetch(`http://127.0.0.1:3001/images/${imageId}`).then(resp => resp.json())
    return response
  }
)

//export const fetchImageById = createAsyncThunk(
//  'images/fetchImageById',
//  async imageId => {
//    const response = await fetch(`http://127.0.0.1:3001/images/${imageId}`)
//    const processedResponse = await response.json()
//    return processedResponse.data
//  }
//)

const imagesSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    addImage: (state, action) => {
      state.images.push(action.payload)
    },
    fetchImageById: (state, action) => {
      state.status = 'success'
      imagesAdapter.upsertOne(state, action.payload.data.attributes)
    }
    //fetchImageById: (state, action) => {
    //  imagesAdapter.upsertOne(state, action.payload)
    //}
  },
  extraReducers: {
    [postNewImage.fulfilled]: (state, action) => imagesAdapter.addOne(state, action.payload),
    [fetchImages.fulfilled]: (state, action) => {
      state.status = 'success'
      const loader = action.payload.data.map(i => i.attributes)
      imagesAdapter.upsertMany(state, loader)
    }
  }
});

export const {
  selectById: selectImageById,
  selectAll: selectAllImages
} = imagesAdapter.getSelectors(state => state.images)

export const addImage = imagesSlice.actions;
export default imagesSlice.reducer;

