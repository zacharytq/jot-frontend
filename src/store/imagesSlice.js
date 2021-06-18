import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';

const imagesAdapter = createEntityAdapter()
const initialState = imagesAdapter.getInitialState({
  status: 'idle'
})

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

export const fetchImageById = (imageId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: 'images/fetchImageByIdPending' })
      dispatch({ type: 'jots/setStatusToWorking' })
      let response = await fetch(`http://127.0.0.1:3001/images/${imageId}`)
      if (response.ok) {
        let respJson = await response.text()
        let myObj = JSON.parse(respJson)
        const payload = {
          id: myObj.data.id,
          imageUrl: myObj.data.links.image_url,
          jots: myObj.data.attributes.jots.map(jot => jot.id)
        }
        dispatch({ type: 'images/fetchImageByIdSuccess', payload })
        dispatch({ type: 'jots/addManyJots', payload: myObj.data.attributes.jots })
        console.log(myObj.data)
      }
    } catch (err) {
      console.error(err)
    }
  }
}

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
    fetchImageByIdPending: (state) => {
      state.status = 'loading'
    },
    fetchImageByIdSuccess: (state, action) => {
      state.status = 'success'
      imagesAdapter.upsertOne(state, action.payload)
    }
    //fetchImageById: (state, action) => {
    //  imagesAdapter.upsertOne(state, action.payload)
    //}
  },
  extraReducers: {
    [postNewImage.fulfilled]: (state, action) => imagesAdapter.addOne(state, action.payload),
  }
});

export const {
  selectById: selectImageById
} = imagesAdapter.getSelectors(state => state.images)

export const addImage = imagesSlice.actions;
export default imagesSlice.reducer;

