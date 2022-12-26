import {configureStore} from '@reduxjs/toolkit';
import MyProductReducer from '../newredux/MyProductSlice';
import MyCartReducer from '../newredux/MyCartSlice';

import {combineReducers} from '@reduxjs/toolkit';
import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

let persistConfig = {
  key: 'root',
  storage,
};
let rootReducer = combineReducers({
  product: MyProductReducer,
  cart: MyCartReducer,
});

let persistedReducer = persistReducer(persistConfig, rootReducer);

export const mystore = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
