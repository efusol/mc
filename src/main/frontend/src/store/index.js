import { configureStore } from '@reduxjs/toolkit';
import memberReducer from './member'

const store = configureStore({
  reducer: {
    member : memberReducer,
  },
});

export default store; 