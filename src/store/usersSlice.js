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

const initialState = {
  status: 'idle',
  loggedIn: false,
  currentUser: {},
  error: null
}

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
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
