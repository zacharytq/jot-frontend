import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const setToken = (token) => {
  localStorage.setItem('token', token);
  localStorage.setItem('lastLoginTime', new Date(Date.now()).getTime());
}

export const getToken = () => {
  const now = new Date(Date.now()).getTime()
  const thirtyMinutes = 1000 * 60 * 30
  const timeSinceLastLogin = now - localStorage.getItem('lastLoginTime')
  if (timeSinceLastLogin < thirtyMinutes) {
    return localStorage.getItem('token')
  }
}

export const signupUser = (credentials) => {
  return async (dispatch) => {
    return fetch('http://127.0.0.1:3001/signup',{
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then((resp) => {
        if (resp.ok) {
          setToken(resp.headers.get('Authorization'))
          return resp.json()
        } else {
          throw Error(resp.json())
        }
      })
      .then((json) => {
        dispatch({ type: 'users/createUser', payload: json.data })
      })
      .catch((error) => {
        dispatch({ type: 'users/createUserError', payload: error.status.message })
      })
  }
}

const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser')

const initialState = {
  status: 'idle',
  loggedIn: false,
  currentUser: {},
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser(state, action) {
      state.currentUser = action.payload
      state.loggedIn = true
    },
    createUserError(state, action) {
      state.error = action.payload
    }
  },
  extraReducers: {
    [fetchCurrentUser.pending]: (state) => {
      state.status = 'loading'
    },
    [fetchCurrentUser.fulfilled]: (state, action) => {
      state.status = 'succeeded'
      state.currentUser = action.payload
      state.loggedIn = true
    },
    [fetchCurrentUser.rejected]: (state, action) => {
      state.status = 'failed'
      state.error = action.error.message
    }
  }
})

export default usersSlice.reducer;
