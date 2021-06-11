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

export const loginUser = (credentials) => {
  return async (dispatch) => {
    return fetch('http://127.0.0.1:3001/login',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then((resp) => {
        if (resp.ok) {
          setToken(resp.headers.get('Authorization'))
          return resp.json()
        } else {
          throw Error(resp)
        }
      })
      .then((json) => {
        dispatch({ type: 'users/loginUser', payload: json.data })
      })
      .catch((error) => {
        dispatch({ type: 'users/loginUserError', payload: error.message })
      })
  }
}

export const signupUser = (credentials) => {
  return async (dispatch) => {
    return fetch('http://127.0.0.1:3001/signup',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then((resp) => {
        if (resp.ok) {
          setToken(resp.headers.get('Authorization'))
          return resp.json()
        } else {
          throw Error(resp)
        }
      })
      .then((json) => {
        dispatch({ type: 'users/createUser', payload: json.data })
      })
      .catch((error) => {
        dispatch({ type: 'users/createUserError', payload: error.message })
      })
  }
}

export const logoutUser = () => {
  return async (dispatch) => {
    return fetch('http://127.0.0.1:3001/logout', {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: getToken()
      }
    })
      .then((resp) => {
        if (resp.ok) {
          return dispatch({type: 'users/logoutUser'})
        } else {
          return resp.json().then((errors) => {
            dispatch({type: 'users/logout'})
            return Promise.reject(errors)
          })
        }
      })
  }
}

const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser')

export const selectLoggedIn = state => state.users.loggedIn

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
      state.loggedIn = false
      state.error = action.payload
    },
    logoutUser(state) {
      state.loggedIn = false
      state.currentUser = {}
    },
    loginUser(state, action) {
      state.loggedIn = true
      state.currentUser = action.payload
    },
    loginUserError(state, action) {
      state.loggedIn = false
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
