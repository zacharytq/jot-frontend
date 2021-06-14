import { configureStore } from '@reduxjs/toolkit';

import imagesReducer from './imagesSlice';
import jotsReducer from './jotsSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    images: imagesReducer,
    jots: jotsReducer,
    users: usersReducer
  }
})
